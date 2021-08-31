# Preposterous

A [Prosperous Universe](https://prosperousuniverse.com) Base Management and Planning Tool

### building and running

it's a react app.  no surprises.  take a look at scripts in `package.json` if you need help with options.

before first run, you'll want to run `yarn types:openapi` to get api communication set up.

you can run Preposterous with `yarn start` from any machine containing a copy of this repository and access to the
internet.

### FIO

the app is completely 'live'; there is no bespoke server and all data comes from [FIO](https://fio.fnar.net).

**your data is completely private**.  outside of your direct connection to FIO, there are no other 3rd party connections or
servers involved.

since the application stores all data in browser local storage, it is non-transferrable.  any planning you do in 
Preposterous is unique to the device from which you connect.  if you use Preposterous from multiple computers or from
mobile, your planning/scheduling data will _**not**_ be shared between these devices.

### *a little context...*

to use this app you should already have a PrUn account as well as a FIO account.
the app will ask for your FIO credentials to get started, and then load up a bunch of first-time data to get things 
running.
once you're all loaded, you should see a pretty accurate reflection of your current game state in PrUn.  if things seem
out of sync, try refreshing PrUn a couple times, and come back to Preposterous and hit the 'sync' button.
generally speaking Preposterous should take care of sync itself, but it may lag as much as a minute or two to avoid 
absolutely destroying Saganaki and Kovus' hard work on the FIO server with massive numbers of requests.

your existing base(s) should stay up to date, but you can always add `SPEC`ulative expansions.  budgets will reflect 
your spec needs for costs, but only assume actual production for income.
