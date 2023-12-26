# open-s3: An object storage service like AWS S3

This service supports storage of following mimeTypes:
```
[
  'image/jpeg', // .jpg or .jpeg
  'image/png', // .png
  'image/gif', // .gif
  'application/pdf',
  'text/plain', // .txt
  'text/csv', //.csv
  'application/msword', // .doc
  'application/vnd.ms-excel', //.xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
]
```


To start project locally:

- Clone repository `git clone https://github.com/aryanmaurya314/open-s3.git`
- go to project folder: `cd open-s3`
- replace `.env/development` file with your variables
- run command `yarn dev` to start

## Project APIs:

### CREATE_BUCKET `POST /api/v1/buckets`

Request:- bucketName in reqBody as name

```
curl --location 'http://localhost:3000/api/v1/buckets' \
--header 'Content-Type: application/json' \
--data '{
    "name": "my-docs"
}
'
```

Response

```
{
    "status": "success",
    "message": "Bucket 'my-docs' created successfully."
}
```

### LIST_BUCKETS `GET /api/v1/buckets`

Request

```
curl --location 'http://localhost:3000/api/v1/buckets'
```

Response

```
{
    "status": "success",
    "message": "All the buckets fetched successfully.",
    "result": [
        {
            "_id": "658816ec16836543bdbe40b6",
            "name": "my-docs",
            "createdAt": "2023-12-24T11:29:59.178Z"
        },
        {
            "_id": "6588175616836543bdbe40b7",
            "name": "my-images",
            "createdAt": "2023-12-24T11:29:59.178Z"
        }
    ]
}
```

### DELETE_BUCKET `DELETE /api/v1/buckets/:bucketName`

Request

```
curl --location --request DELETE 'http://localhost:3000/api/v1/buckets/my-docs'
```

Response

```
{
    "status": "success",
    "message": "Bucket 'my-docs' deleted successfully."
}
```

### PUT_OBJECT `POST /api/v1/objects/:bucketName/:objectKey`

Request

```
curl --location 'http://localhost:3000/api/v1/objects/my-docs/sample-2' \
--form 'object=@"/path/to/object"'
```

Response

```
{
    "status": "success",
    "message": "Object 'sample-1.jpeg' uploaded successfully."
}
```

### GET_OBECT `GET /api/v1/objects/:bucketName/:objectKey`

Request

```
curl --location 'http://localhost:3000/api/v1/objects/my-docs/sample-1' --output sample-1.jpeg
```

Response

```
Object File
```

### LIST_OBJECTS `GET /api/v1/objects/:bucketName`

Request

```
curl --location 'http://localhost:3000/api/v1/objects/my-docs'
```

Response

```
{
    "status": "success",
    "message": "Objects of bucket 'my-docs' fetched successfully.",
    "result": [
        {
            "_id": "658a58cc9b9da047073f60fc",
            "key": "img-2",
            "name": "img-2.png",
            "createdAt": "2023-12-26T04:38:36.864Z"
        },
        {
            "_id": "658a59099b9da047073f60fe",
            "key": "img-3",
            "name": "sample-1.jpg",
            "createdAt": "2023-12-26T04:39:37.312Z",
            "updatedAt": "2023-12-26T04:45:18.161Z"
        }
    ]
}
```

### DELETE_OBJECT `DELETE /api/v1/objects/:bucketName/:objectKey`

Request

```
curl --location --request DELETE 'http://localhost:3000/api/v1/objects/my-docs/sample-1'
```

Response

```
{
    "status": "success",
    "message": "Object 'sample-1' deleted from bucket 'my-docs' successfully."
}
```
