from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse

import json

from common.json import ModelEncoder

from .models import Shoe, BinVO

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ['id', 'closet_name', 'bin_number', 'bin_size',]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "brand_name",
        "color",
        "pic_url",
        "bin",
    ]
    encoders = {
        "bin": BinVOEncoder()
    }


@require_http_methods(["GET"])
def list_bins(request):
    bin = BinVO.objects.all()
    return JsonResponse(
    {"bins": bin},
    encoder=BinVOEncoder,
)


@require_http_methods(["GET", "POST"])
def list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            bin = BinVO.objects.get(id=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def show_shoe(request, id):
    if request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        try:
            shoe = Shoe.objects.get(id=id)
            return JsonResponse(
                shoe,
                encoder=ShoeListEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Shoe not found"},
                status=400,
            )
