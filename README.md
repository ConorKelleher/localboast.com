# LocalBoast.com Source Code

![BannerImage](assets/icons/ColourSolidWide.jpeg)

**Live Website**: https://LocalBoast.com

This source code is provided completely openly as a means of self-documentation and to not have any secrets. This is not meant to be a showcase of best practices nor is it the cleanest my code can be. It is meant to be a functional, at times visually appealing showcase of an end-product, not the means to get there.

For more insight into my preferred coding style and better documentation habits, have a gander at the associated project [LocalBoast](https://github.com/ConorKelleher/localboast) which provides much of the underlying functionality of this website.

## To Run

This is a vite app built with typescript. It should function normally by installing dependencies as regular through `yarn` and run locally through `yarn dev`.

There are only two non-standard pieces of this repo (that I can think of at the time of writing):

- [push.js](https://github.com/ConorKelleher/localboast.com/blob/main/push.js): This is simply how I deploy the website, authenticating with AWS (using a gitignored `.env` file), clearing the current s3 bucket containing my website and reuploading the new static build.
- storybook-static: On the topic of static websites, I've done something funky here. The code for this website contains an embedded version of the static build of the storybook app used for development/documentation of the [LocalBoast library](https://github.com/ConorKelleher/localboast). Certain pages of this website embed iframes from that static storybook build. This is done through having the [LocalBoast](https://github.com/ConorKelleher/localboast) repo installed locally and running `yarn build-storybook`. This call not only builds the static storybook code, but copies it over to the `assets` folder of this website. Through this, I can have the output of one local app embedded into the source code of another app. Kinda funky but it works. If you haven't built the storybook static code, the iframes will just show an error message.

# Usage

Feel free to adapt this code to your own projects or just try building it locally to see how it all works and play around with your own modifications of your own website.

# Issues/Pull Requests

While I'm not really intending for there to be collaboration on this project (as it's a personal portfolio of sorts and not intended to be used as-is by anyone other than me), I will happily entertain any issues or Pull Requests that come in, especially if it's something that I'm not personally invested in and happy to have input on (such as security concerns, performance issues, etc.)

# Live Development

In an attempt to be somewhat unique, the development of this project is largely happening live on stream over on [Twitch](https://twitch.tv/localboast1) or on [YouTube Live](http://youtube.com/channel/UCt-IaL4qQsOU6_rbS7zky1Q/live). A record of all past live streams and other video documentation can also be found at the above YouTube channel.

# Donations

I'm working on this instead of having a job that pays me. So for the time being, I'm going to be funded through generosity alone. If you're feeling generous, here are some links:

- Direct Tip (will show up on stream if I'm live): https://streamelements.com/localboast1/tip
- Patreon: https://patreon.com/LocalBoast

# License

MIT © [ConorKelleher](https://github/com/ConorKelleher)
