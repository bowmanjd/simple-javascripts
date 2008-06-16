USAGE
-----

First, include the JavaScript library in your page:

    <script type="text/javascript" src="simple_modal.js"></script>

Also include the CSS stylesheet in the head of your page:

    <link href="simple_modal.css" type="text/css" rel="STYLESHEET">

To open a modal box, use the following:

Simple.Modal.open('content');

Content can be a string with any combination of text or HTML tags,
or an already constructed HTML element.

To close the modal box, use the following:

Simple.Modal.close();
