<?php

// if the url field is empty, but the message field isn't
if (isset($_POST['url']) && $_POST['url'] == '' && $_POST['message'] != '') {
    // put your email address here
    $contactmail = 'contact@rohten.com';

    // prepare a "pretty" version of the message
    // Important: if you added any form fields to the HTML, you will need to add them here also
    $body = "This is the form that was just submitted:
	Name:  $_POST[name]
	E-Mail: $_POST[email]
	Message: $_POST[message]";

    // Use the submitters email if they supplied one
    // (and it isn't trying to hack your form).
    // Otherwise send from your email address.
    if ($_POST['email'] && !preg_match("/[\r\n]/", $_POST['email'])) {
        $headers = "From: $_POST[email]";
    } else {
        $headers = "From: $youremail";
    }
    // finally, send the message
    mail($contactmail, 'Contact Request', $body, $headers);
}
// otherwise, let the spammer think that they got their message through
header('Location: /thank-you/');
exit('Redirecting you back');
