# Wardrobify

Team:

- Person 1 - Chris O'Rourke - hats
- Person 2 - Anaka Norfleet - shoes

## Design

## Shoes microservic

My partner and I used Domain Driven Design using ubiquitous language to build our project. I created a shoe entity usimg Django models and views and then connected it to the Bins via a Bin Value Object creating an aggregate. My aggregates together with my partners' make up the Wardrobe bounded context. We use Docker for our microservices so that we can scale in the future.

## Hats microservice

Setup admin pathing /admin/, Created Hat model and LocationVO model & set attributes based on the reference in the Wardrobe application. Set the Poller to grab information from API and send back to hats_api. React uses API calls to get data to create hats and list hats.
