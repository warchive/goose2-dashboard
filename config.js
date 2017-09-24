/**
 *......................................................................
 *.   o   \ o /  _ o        __|    \ /     |__         o _  \ o /   o   .
 *.  /|\    |     /\   __\o   \o    |    o/     o/__   /\     |    /|\  .
 *.  / \   / \   | \  /) |    ( \  /o\  / )    |   (\  / |   / \   / \  .
 *.       .......................................................       .
 *. \ o / .                                                     . \ o / .
 *.   |   .             SPEEDING UP THE DASHBOARD               .   |   .
 *.  / \  .                                                     .  / \  .
 *.       .                                                     .       .
 *.  _ o  .     There is a really easy way to speed up the      .  _ o  .
 *.   /\  .     dashboard.                                      .   /\  .
 *.  | \  .                                                     .  | \  .
 *.       .     Basically, in it's default state, the           .       .
 *.       .     dashboard will update EVERYTIME the pod         .       .
 *.  __\o .     sends the dashboard data since we're using      .  __\o .
 *. /) |  .     react, that can be an extremely expensive       . /) |  .
 *.       .     process.                                        .       .
 *. __|   .                                                     . __|   .
 *.   \o  .     There is a solution: you can make the           .    \o .
 *.   ( \ .     dashboard "save" the incoming data and          .   ( \ .
 *.       .     wait for a set amount of time and update        .       .
 *.  \ /  .     the redux store all at once!                    .  \ /  .
 *.   |   .                                                     .   |   .
 *.  /o\  .     PROS                                            .  /o\  .
 *.       .      - Less rendering so the state is faster        .       .
 *.   |__ .      - It still displays the same amount of data    .   |__ .
 *. o/    .      - Super easy to change!!                        . o/    .
 *./ )    .                                                     ./ )    .
 *.       .     Cons                                            .       .
 *.       .      - The dashboard will "wait" so it doesn't      .       .
 *. o/__  .        look as smooth                               . o/__  .
 *.  | (\ .      - Literally it                                 . |  (\ .
 *.       .                                                     .       .
 *. \ o / .    You can control this feature with the two        . \ o / .
 *.   |   .    constants below.                                 .   |   .
 *.  / \  .                                                     .  / \  .
 *.       .......................................................       .
 *.   o   \ o /  _ o        __|    \ /     |__         o _  \ o /   o   .
 *.  /|\    |     /\   __\o   \o    |    o/     o/__   /\     |    /|\  .
 *.  / \   / \   | \  /) |    ( \  /o\  / )    |   (\  / |   / \   / \  .
 *.......................................................................
 */

/**
 * If BATCH_UPDATES is true, the api listener will save the data and
 * change the store at the same time
 *
 * This is only for data and not for state since state is a little more
 * time sensitive
 */
export const BATCH_UPDATES = false

/**
 * How long the dashboard should save the data for before sending them off
 *
 * The higher the number, the less the dashboard will have to render
 */
export const BATCH_UPDATE_INTERVAL = 500

// Default URL for the server
export const URL = 'ws://localhost:8000/'

// If we need to prompt for URL every time
export const PROMPT_FOR_URL = true

// If we want to cache all recieved data in the redux store
export const CACHE_LAST_DATA = true

// Expected time delay between heart beats
export const HEART_BEAT_POLLING_DELAY = 200

// How many data points big graphs should show
export const LARGE_GRAPH_POINTS = 50

// How many data points small graphs hould show
export const SMALL_GRAPH_POINTS = 20

// How many decimal places values should be rounded to
export const ROUNDING = 1

// Function that can be imported to round values
export const roundValue = (val) => Math.round(val * (10 ** ROUNDING)) / 10 ** ROUNDING

// definitions for different state names
export const STATES = [
  'Man',
  'Standby',
  'Rdy',
  'Accel',
  'Coast',
  'Brk_Hi',
  'Brk_lo'
]
