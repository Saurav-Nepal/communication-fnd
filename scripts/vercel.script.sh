#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "dev" || "$VERCEL_GIT_COMMIT_REF" == "demo" || "$VERCEL_GIT_COMMIT_REF" == "production" || "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "FN-3119-ar-collection-portal" || "$VERCEL_GIT_COMMIT_REF" == "*-staging" ]] ; then
  # Proceed with the build
	echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi