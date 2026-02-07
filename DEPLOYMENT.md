# Deployment Checklist

## Pre-Deployment

### Environment Configuration
- [ ] Change `JWT_SECRET` to a strong random value in backend `.env`
- [ ] Verify `MONGODB_URI` points to production database
- [ ] Update `NEXT_PUBLIC_API_URL` to production backend URL
- [ ] Set `NODE_ENV=production` in backend

### Security
- [ ] Remove default admin credentials
- [ ] Configure CORS for production domain only
- [ ] Enable HTTPS/SSL certificates
- [ ] Set secure cookie options
- [ ] Add input validation sanitization
- [ ] Rate limiting on API endpoints
- [ ] CSRF protection if needed

### Database
- [ ] MongoDB backups configured
- [ ] Database indexes created
- [ ] Connection pooling configured
- [ ] Replica set configured (if needed)

### Testing
- [ ] All pages load correctly
- [ ] User checkout flow works end-to-end
- [ ] Admin dashboard accessible and functional
- [ ] All CRUD operations tested
- [ ] Order creation and status updates tested
- [ ] Search functionality tested
- [ ] Mobile responsiveness verified

## Deployment Steps

### Backend Deployment

1. **Choose Hosting** (Options):
   - Heroku (free tier limited)
   - Railway
   - Render
   - AWS EC2
   - DigitalOcean
   - Vercel (backend support)

2. **Build and Deploy**:
   ```bash
   cd backend
   npm run build  # if needed
   npm start
   ```

3. **Verify**:
   - [ ] API health check: `GET /api/health`
   - [ ] Database connection working
   - [ ] Admin login functional

### Frontend Deployment

1. **Recommended**: Vercel (built for Next.js)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Alternative**: Any Node.js host
   ```bash
   npm run build
   npm start
   ```

3. **Environment Variables**:
   - Add `NEXT_PUBLIC_API_URL` pointing to production backend

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor API response times
- [ ] Monitor database performance
- [ ] Set up uptime monitoring

### Operations
- [ ] Document deployment process
- [ ] Set up automated backups
- [ ] Plan maintenance windows
- [ ] Create runbooks for common issues
- [ ] Set up alerting for errors

### Analytics (Optional)
- [ ] Track total orders
- [ ] Monitor failed transactions
- [ ] Analyze user behavior
- [ ] Monitor server performance

## Common Issues & Solutions

### Database Connection Failing
```
Check:
- MongoDB is running
- MONGODB_URI is correct
- Network access allows your server IP (if cloud DB)
```

### CORS Errors
```
Add to backend:
app.use(cors({
  origin: ['https://yourdomain.com', 'https://admin.yourdomain.com'],
  credentials: true
}));
```

### Slow API Responses
```
Solutions:
- Add database indexes
- Implement caching
- Optimize queries
- Use CDN for images
```

### Image Upload Issues
```
Solutions:
- Use external image hosting (Cloudinary, AWS S3)
- Validate image sizes before upload
- Implement image compression
```

## Domain Setup

If using separate domains:

**User Panel**: `https://example.com`
**Admin Dashboard**: `https://example.com/admin`

Or separate domains:

**User Panel**: `https://shop.example.com`
**Admin Dashboard**: `https://admin.example.com`

## Scaling Considerations

**When you grow**:
1. Add database indexing
2. Implement caching (Redis)
3. Use CDN for images
4. Load balance API servers
5. Separate admin from user traffic
6. Implement queue for order processing
7. Add session management for admins

## Backup Strategy

```
Daily backups of:
- MongoDB data
- Product images (if hosted locally)
- Admin credentials
- Configuration files

Keep backups for:
- 30 days (daily)
- 12 months (monthly snapshots)
```

## Rollback Plan

If deployment goes wrong:

1. Have previous version ready to redeploy
2. Document all changes made
3. Have database backups available
4. Test rollback procedure
5. Keep communication with users

---

After following this checklist, your T-Shirt Brand store will be ready for production!
