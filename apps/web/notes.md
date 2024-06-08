- Create fetchBaseWrapper
- Define fetch functions in server actions
<!-- @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#sequential-data-fetching -->
- Call server action from both client and server components
- Use cookies to pass user authentication state
  - Define a getAuthUser function that's literally grabbing the auth user from the cookies (NOTE: either store the entire auth user object in there or the access token only. You can always fetch the object when you need the data)
- Another option is to use redux toolkit for global state management and use the workaround for the useDispatch and useSelector hooks in server components (WILL SCALE BETTER!!)
