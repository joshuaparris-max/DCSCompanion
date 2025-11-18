# Firestore Security Rules for DCS Companion

These rules protect user data while allowing proper access patterns.

## Copy These Rules to Firestore

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your DCS Companion project
3. Go to **Firestore Database → Rules** tab
4. Replace all content with the rules below
5. Click **"Publish"**

## Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profiles - each user can only access their own
    match /users/{uid} {
      // Authenticated users can read/write their own profile
      allow read, write: if request.auth.uid == uid;
      
      // Allow creation during signup
      allow create: if request.auth.uid == request.resource.data.uid;
      
      // Prevent uid and email modification
      allow update: if request.auth.uid == uid
        && !request.resource.data.keys().hasAny(['uid', 'email']);
    }
    
    // Knowledge base - shared read, admin write
    match /knowledgeBase/{doc} {
      // Authenticated users can read
      allow read: if request.auth != null;
      
      // Only admins can write
      allow create, update, delete: if request.auth != null 
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Deny everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## Rules Explanation

### Users Collection
- **Read/Write:** Users can only access their own profile (`request.auth.uid == uid`)
- **Creation:** Allowed during registration with matching UID
- **Update:** Cannot modify UID or email (immutable fields)

### Knowledge Base Collection
- **Read:** All authenticated users can read
- **Write:** Only admins can create/update/delete

### Default Deny
- All other collections are inaccessible by default

## Development (Test Mode)

For development testing, use permissive rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Warning:** Never use this in production. Always revert to proper security rules above.

## Migration Path

1. Start development in **Test Mode** (default)
   - Allows anyone to read/write during development
   - Firebase shows 30-day warning

2. Before production, switch to **Production Rules** above
   - Restricts data access to authenticated users
   - Prevents unauthorized access

3. Monitor in Firebase Console → Logs
   - Check for any permission denied errors
   - Adjust rules if legitimate uses are blocked

## Testing Rules

Test rules in Firebase Emulator:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Start emulator
firebase emulators:start

# Your app will connect to local Firestore
```

Then test reads/writes without hitting production database.

## Common Modifications

### Allow Multiple Roles to Write

```firestore
allow create, update, delete: if request.auth != null 
  && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'support'];
```

### Prevent User Deletion

```firestore
allow delete: if false;  // Users cannot delete their own data
```

### Rate Limiting

```firestore
allow write: if request.auth != null 
  && request.time > resource.data.lastWrite.toMillis() + duration.value(1, 's');
```

### Require Email Verification

```firestore
allow read, write: if request.auth != null 
  && request.auth.token.email_verified;
```

## Troubleshooting

### "Permission denied" errors

1. Check rule syntax (JavaScript-like validation)
2. Verify user UID in rules matches Firebase Auth UID
3. Check user document exists in Firestore
4. Test with Firebase Emulator first

### Data not saving

1. Check browser console for errors
2. Verify auth user is logged in: `request.auth != null`
3. Check Firestore database is in correct region
4. Review Firestore cost (free tier limits)

### Rules too permissive

- Start restrictive (deny all)
- Add specific allow rules for each use case
- Test with Firestore Emulator
- Review Firebase documentation

## Rule Resources

- [Firestore Rules Documentation](https://firebase.google.com/docs/firestore/security/start)
- [Rule Examples](https://firebase.google.com/docs/firestore/security/rules-examples)
- [Firestore Emulator](https://firebase.google.com/docs/emulator-suite)

## Rollback

If rules cause issues:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // Temporarily allow all
    }
  }
}
```

Then investigate and reapply proper rules.

---

**Next Steps:** After publishing these rules, test login/registration flow to ensure it works correctly.
