USAGE
-----

First, include the JavaScript library in your page:

    <script type="text/javascript" src="simple_tooltip.js"></script>

Also include the CSS stylesheet in the head of your page:

    <link href="simple_tooltip.css" type="text/css" rel="STYLESHEET">

(Or copy the CSS into your own stylesheet.)

Find the following line in simple_tooltip.js (around line 23):

    className: 'tooltip', // leave blank to enable all titled elements

and change 'tooltip' to the appropriate class. All elements with title
attributes that are marked with this class will have tooltips enabled.
If you want all titled elements to use tooltips, leave this string blank,
or comment out the line.
