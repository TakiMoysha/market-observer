## Database

```mermaid
erDiagram
    users {
        int id PK
        string username
        string email
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
6. https://elysiajs.com/tutorial#authentication
7. https://synvinkel.org/notes/node-postgres-migrations
8. https://github.com/nuxt-community/composition-api
9. https://gitlab.com/88brmig/migrants-app-v2
