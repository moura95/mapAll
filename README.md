
# Mapall

## Download Collection postman:
`/docs/UrlShortner.postman_collection.json`

## Google Cloud enviroment
https://mapall-west1-nun74sicwq-ew.a.run.app

## Run Local

Execute Database Docker Image
```bash
docker-compose up
```


Install Dependencies

```bash
  npm install
```

Run Server Service

```bash
 npm run dev`
```
Endpoints

Create Url Shortner
POST /
```json
{
    "full": {"type": "string", "required": true},
    "short": {"type": "string", "required":false}
}
```
Redirect to full url
GET /redirect/:shortUrl

Metrics
GET /metrics
```json
{
    "total_urls_shortened": 2,
    "urls_shortened_last_day": 2,
    "urls_shortened_last_week": 2,
    "urls_shortened_last_two_weeks": 2,
    "urls_shortened_last_month": 2,
    "urls_shortened_last_year": 2,
    "redirect_count_by_short_url": [
        {
            "JaguU3": 0
        },
        {
            "M44xuD": 0
        }
    ]
}
```

Get All Urls Shortner
GET /
```json
[
    {
        "id": 1,
        "full": "https://www.google.com",
        "short": "JaguU3",
        "random": true,
        "count": 0,
        "createdAt": "2023-05-03T20:53:15.852Z",
        "updatedAt": "2023-05-03T20:53:15.852Z"
    }
]
```
