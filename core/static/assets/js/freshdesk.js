
    //<![CDATA[
    jQuery(function(){

    jQuery('#submit_req').click(function(){
    createTicket();
    });
    var invocation = new XMLHttpRequest();
    var url = 'https://<your_freshdesk_domain>.freshdesk.com/helpdesk/tickets.json';
    var invocationHistoryText;
    var body;
  //   var body = '{ "helpdesk_ticket": { "description": "Details about the issue...", "subject": "Support Needed...", "email": "tom@outerspace.com", "priority": 1, "status": 2 }, "cc_emails": "" }';

    function createTicket(){
        //The custom field names in the portal can be obtained from <ticket_id>.json

    body = '{"helpdesk_ticket":{"description":"'+jQuery('#desc_req').val() + '", "subject":"' + jQuery('#title_req').val() +'", "email":"' + jQuery('#email_req').val()+'","priority":1,"status":2,"custom_field":{ "customer_id_175593" :"'+jQuery('#custom_req').val()+'" }}}';  



        if(invocation)
        {
            invocation.open('POST', url, true);
            invocation.setRequestHeader('Authorization', "Basic " + btoa(
"<your_api_key>:X") );
            invocation.setRequestHeader('Content-Type', 'application/json');
            invocation.onreadystatechange = handler;
            invocation.send(body);
        }
        
    }
    function handler(evtXHR)
    {
        if (invocation.readyState == 4)
        {
                if (invocation.status == 200)
                {
                    alert("Ticket created successfully !");
                }
                else
                {
                    alert("Invocation Errors Occured " +
invocation.readyState + " and the status is " + invocation.status);
                }
        }
        else
        {
            console.log("currently the application is at" + invocation.readyState);
        }
    }
});
    //]]>