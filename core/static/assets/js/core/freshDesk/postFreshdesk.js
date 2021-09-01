$(document).ready(function () {
    $(window).load(function () {
      function parseURL(url) {
        const parser = document.createElement("a");
        const searchObject = {};

        // Let the browser do the work
        parser.href = url;

        // Convert query string to object for convenience
        const queries = parser.search.replace(/^\?/, "").split("&");
        for (let i = 0; i < queries.length; i++) {
          const split = queries[i].split("=");
          searchObject[split[0]] = split[1];
        }

        return {
          protocol: parser.protocol,
          host: parser.host,
          hostname: parser.hostname,
          port: parser.port,
          pathname: parser.pathname,
          search: parser.search,
          searchObject: searchObject,
          hash: parser.hash,
        };
      }

      function capital(s) {
        return s[0].toUpperCase() + s.slice(1);
      }
      var yourdomain = "criticaldefenseus";
      var api_key = "7RBC0Ki8KRl8jWKdlKN";
      var pageURL = parseURL($(location).attr("href")).hostname.replace(
        ".localhost",
        ""
      );

      var cap = capital(pageURL);

      $.ajax({
        url: "https://" + yourdomain + ".freshdesk.com/api/v2/contacts ",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          Authorization: "Basic " + btoa(api_key + ":x"),
        },
        success: function (data) {
          $.each(data, function (key, value) {
            if (value.name == cap) {
              companyEmail = value.email;
            }
          });
        },
      });
    });
    $("button").click(function () {
      var yourdomain = "criticaldefenseus";
      var api_key = "7RBC0Ki8KRl8jWKdlKN";

      var person = $("#persons");
      var subject = person.val();
      ticket_data =
        '{ "description": "Details about the issue...", "subject": "Support Needed...", "email": "' +
        companyEmail +
        '", "priority": 2, "status": 2, "custom_fields" : {"cf_persons_displaying_concerning_behaviornameageresidence_address": "' +
        $("#persons").val() +
        '","cf_description_of_the_concern": "' +
        $("#description").val() +
        '","cf_when_and_where_is_the_incidentaction_going_to_occur": "' +
        $("#when").val() +
        '","cf_is_anyone_else_aware_of_the_concern": "' +
        $("#anyoneElse").val() +
        '","cf_if_yes_who": "' +
        $("#yesNo").val() +
        '","cf_additional_information": "' +
        $("#additional").val() +
        '","cf_would_you_like_to_speak_to_a_investigator": "' +
        $("#investigator").val() +
        '","cf_if_yes_please_provide_your_name_andor_phone_number": "' +
        $("#phone").val() +
        '"}}';

      $.ajax({
        url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val(),
          Authorization: "Basic " + btoa(api_key + ":x"),
        },
        data: ticket_data,

        success: function (data, textStatus, jqXHR) {
            console.log("Success");
              $(document).ajaxStop(function() {
        setInterval(function() {
            location.reload();
        }, 3000);
    });
          
        },
        error: function (jqXHR, tranStatus) {
          $("#result").text("Error");
          $("#code").text(jqXHR.status);
          x_request_id = jqXHR.getResponseHeader("X-Request-Id");
          response_text = jqXHR.responseText;
          $("#response").html(
            " Error Message : <b style='color: red'>" +
              response_text +
              "</b>.<br/> Your X-Request-Id is : <b>" +
              x_request_id +
              "</b>. Please contact support@freshdesk.com with this id for more information."
          );
        },
      });
          $(document).ajaxStop(function() {
        setInterval(function() {
            location.reload();
        }, 3000);
    });
    });
  });