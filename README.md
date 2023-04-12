## This form is BROKEN.

I have a Next.js project that uses a script to inject attribution data into hidden fields on a form. I know, this sucks.
Unfortunately, it is for tracking attribution of form sign-ups, so it’s really important.

We are, right now, using this package: [https://github.com/derekcavaliero/attributor](https://github.com/derekcavaliero/attributor)
If you have a better way of doing this, or a better package to use with next.js, feel free to let me know.

Right now, for some reason, the form is overwriting/resetting the hidden fields when users interact with the visible fields resulting in none of the data getting passed. Please help me!
