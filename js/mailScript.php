<?php
 
{
 


    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "peter.varholak@akademiasovy.sk"; 
    $email_subject = "Spacecraft feedback";
 
     
 
     
 
    function died($error) {
 
        // your error code can go here
 
        echo "It seems there were error(s) found while submitting the form. ";
 
        echo "The error is:<br /><br />";
 
        echo $error."<br /><br />";
 
        echo "Please go back and fix these error(s).<br /><br />";
 
        die();
 
    }
 
     // CAPTCHA BLOCK

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $secretKey = '6LdGjxUTAAAAAEMoPILJtfzM2gOZ1FkIR8tlRnzN';
    $response = file_get_contents($url."?secret=".$secretKey."&response=".$_POST['g-recaptcha-response']."&remoteip=".$_SERVER['REMOTE_ADDR']);
    $data = json_decode($response);

    if(isset($data->success) AND $data->success==true)
    {
 
        // validation expected data exists
     
        if(empty($_POST['name']) || empty($_POST['message'])) {
     
            died('You forgot to fill a required field.');       
     
        }     
     
        $name = $_POST['name']; // required 
        $mail = $_POST['mail'];
        $message = $_POST['message']; // required
     
         
     
        $error_message = "";
     
        $email_exp = "/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i";
     
      if(!empty($_POST['mail']))
      {
        if(!preg_match($email_exp,$mail)) {
     
        $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
     
        }
      }  
     
        $string_exp = "/^[A-Za-z]{2,50}$/";
     
      if(!preg_match($string_exp,$name)) {
     
        $error_message .= 'The First Name you entered does not appear to be valid.<br />';
     
      }
     
      if(strlen($message) < 2) {
     
        $error_message .= 'Your message is not long enough.<br />';
     
      }
     
      if(strlen($error_message) > 0) {
     
        died($error_message);
     
      }
     
        $email_message = "Form details below.\n\n";
     
         
     
        function clean_string($string) {
     
          $bad = array("content-type","bcc:","to:","cc:","href");
     
          return str_replace($bad,"",$string);
     
        }
     
         
     
        $email_message .= "Name: ".clean_string($name)."\n";
     
        $email_message .= "Mail: ".clean_string($mail)."\n";
     
        $email_message .= "Message: ".clean_string($message)."\n";
     
         
     
         
     
    // create email headers
     
    $headers = 'From: '.$mail."\r\n".
     
    'Reply-To: '.$mail."\r\n" .
     
    'X-Mailer: PHP/' . phpversion();
     
    @mail($email_to, $email_subject, $email_message, $headers);  
 
}
else
{
    died("You didn't pass the CAPTCHA test.");
}
?>
 
 
 
<!-- include your own success html here -->
 
 
 
Thank you for your feedback.
 
 
 
<?php
 
}
 
?>