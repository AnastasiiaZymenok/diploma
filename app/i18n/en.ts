const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
    done: "Done",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    create: "Create",
    submit: "Submit",
    search: "Search",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  loginScreen: {
    emailFieldLabel: "Email",
    emailFieldPlaceholder: "Enter your email",
    passwordFieldLabel: "Password",
    passwordFieldPlaceholder: "Enter your password",
  },
  registerScreen: {
    emailFieldLabel: "Email",
    emailFieldPlaceholder: "Enter your email",
    passwordFieldLabel: "Password",
    passwordFieldPlaceholder: "Enter your password",
    confirmPasswordFieldLabel: "Confirm Password",
    confirmPasswordFieldPlaceholder: "Confirm your password",
  },
}

export default en
export type Translations = typeof en
