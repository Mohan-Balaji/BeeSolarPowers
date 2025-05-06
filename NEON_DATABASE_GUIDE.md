# Accessing and Managing Your Neon PostgreSQL Database

This guide provides instructions on how to use your existing Neon PostgreSQL database, including connecting to it and managing it effectively.

## Understanding Your Neon Database

[Neon](https://neon.tech) is a serverless PostgreSQL service that offers:
- Autoscaling
- Branching (for development/testing)
- Modern dashboard
- REST API for administration
- SQL editor
- Connection pooling

## Getting Your Connection Details

### From the Neon Dashboard

1. Log in to your Neon account at [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Navigate to the "Connection Details" tab
4. You'll see connection details for different roles and connection methods

### Understanding the Connection String Format

Your Neon connection string follows this format:
```
postgresql://[user]:[password]@[hostname]/[database]
```

For example:
```
postgresql://beesolar_admin:your-password@ep-white-dawn-123456.us-east-2.aws.neon.tech/bee_solar_db
```

## Connecting to Your Database

### Using the Web SQL Editor

The simplest way to manage your database:

1. Log in to the Neon dashboard
2. Go to your project
3. Click "SQL Editor" in the sidebar
4. Start writing and executing SQL queries directly

### Using External Tools

#### pgAdmin 4

1. Download and install [pgAdmin 4](https://www.pgadmin.org/download/)
2. Open pgAdmin and click "Add New Server"
3. In the "General" tab, enter a name for your connection (e.g., "BEE SOLAR DB")
4. In the "Connection" tab:
   - Host: Your Neon hostname (e.g., `ep-white-dawn-123456.us-east-2.aws.neon.tech`)
   - Port: 5432
   - Database: Your database name (e.g., `bee_solar_db`)
   - Username: Your database username
   - Password: Your database password
5. In the "SSL" tab, set "SSL Mode" to "Require"
6. Click "Save"

#### DBeaver

1. Download and install [DBeaver](https://dbeaver.io/download/)
2. Go to "Database" > "New Database Connection"
3. Select "PostgreSQL" and click "Next"
4. Enter your connection details:
   - Host: Your Neon hostname
   - Port: 5432
   - Database: Your database name
   - Username: Your database username
   - Password: Your database password
5. Go to the "PostgreSQL" tab and check "Use SSL"
6. Test the connection and click "Finish"

#### TablePlus

1. Download and install [TablePlus](https://tableplus.com/)
2. Click "Create a new connection" and select "PostgreSQL"
3. Enter your connection details:
   - Name: A descriptive name for your connection
   - Host: Your Neon hostname
   - Port: 5432
   - User: Your database username
   - Password: Your database password
   - Database: Your database name
4. In the "Advanced" section, check "Connect using SSL"
5. Click "Connect"

### Using Connection Pooling

Neon provides connection pooling for better performance in production:

1. In the Neon dashboard, go to "Connection Details"
2. Select the "Pooled Connection" tab
3. Use this connection string for your application in production

## Managing Your Database

### Schema Management

With Drizzle ORM, you can manage your database schema using the following commands:

1. Push schema changes to the database:
   ```bash
   npm run db:push
   ```

2. Generate migrations for schema changes:
   ```bash
   npm run db:migrate
   ```

3. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

### Backing Up Your Data

Neon provides point-in-time recovery and automated backups, but you can also:

1. Export data using the SQL Editor:
   ```sql
   COPY (SELECT * FROM users) TO STDOUT WITH CSV HEADER
   ```

2. Use pg_dump from your local machine:
   ```bash
   pg_dump --host=your-neon-host --port=5432 --username=your-username --dbname=your-dbname --format=custom --file=backup.dump
   ```

### Database Monitoring

1. In the Neon dashboard, go to "Monitoring"
2. Track metrics like:
   - Active connections
   - CPU usage
   - Memory usage
   - Storage usage

## Best Practices

### Security

1. **Never share your database credentials** in public repositories or client-side code
2. Use environment variables to store sensitive connection details
3. Implement row-level security for multi-tenant applications
4. Create separate database roles with appropriate permissions

### Performance

1. Use connection pooling for production applications
2. Create appropriate indexes for frequently queried columns
3. Limit the number of concurrent connections
4. Use prepared statements for repeated queries

### Cost Management

1. Monitor your usage in the Neon dashboard
2. Schedule compute resources to scale down during off-hours
3. Use the compute time effectively (Neon charges based on active compute time)

## Troubleshooting

### Common Issues

1. **Connection timeout**: Check if you've reached your connection limit or if there are network issues
2. **Authentication failed**: Verify your username and password
3. **SSL required**: Ensure SSL is enabled in your connection settings
4. **Too many connections**: Review your connection pooling strategy

### Getting Support

If you encounter issues:

1. Check the [Neon documentation](https://neon.tech/docs)
2. Contact Neon support through their dashboard
3. Visit the [Neon community forum](https://community.neon.tech/)

## Using Neon with Vercel

When deploying to Vercel:

1. Add your DATABASE_URL environment variable in the Vercel dashboard
2. Consider using the pooled connection string for better performance
3. Ensure your Neon project allows connections from Vercel's IP range

---

With this guide, you should be able to effectively use and manage your existing Neon PostgreSQL database for your BEE SOLAR POWERS application.