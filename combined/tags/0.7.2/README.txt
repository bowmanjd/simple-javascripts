USAGE
-----

First, include the JavaScript library in your page:

    <script type="text/javascript" src="simple.js"></script>

Also include the CSS stylesheet in the head of your page:

    <link href="simple.css" type="text/css" rel="STYLESHEET">

(Or copy the CSS into your own stylesheet.)


Simple.Modal USAGE
------------------

To open a modal box, use the following:

Simple.Modal.open('content');

Content can include any combination of text or HTML tags.

To close the modal box, use the following:

Simple.Modal.close();

Simple.ToolTip USAGE
--------------------

Find the following line in simple.js (around line 93):

    className: 'tooltip', // leave blank to enable all titled elements

and change 'tooltip' to the appropriate class. All elements with title
attributes that are marked with this class will have tooltips enabled.
If you want all titled elements to use tooltips, leave this string blank,
or comment out the line.

Tooltips will be applied automatically.
