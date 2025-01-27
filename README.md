## Database

```mermaid
erDiagram
    users {
        int id PK
        string username
        string password
        float balance
        timestamp created_at
    }

    products {
        int id PK
        string name
        float price
        timestamp created_at
    }

    purchases {
        int id PK
        int user_id FK
        int product_id FK
        timestamp purchase_date
        float amount
    }

    users ||--o{ purchases : "makes"
    products ||--o{ purchases : "contains"
```

## References

1. https://elysiajs.com/patterns/deployment
2. https://elysiajs.com/essential/best-practice
3. https://github.com/jellydn/elysia-demo-app
4. https://jsonplaceholder.typicode.com/
5. https://lucia-auth.com/
6.
