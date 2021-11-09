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

      var cap = "Test1";

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
        '", "priority": 2, "status": 2, "custom_fields" : {"cf_description_of_the_concern": "' +
        $("#eventName").val() +
        '","cf_date_and_time": "' +
        $("#time").val() +
        '","cf_event_venue": "' +
        $("#venue").val() +
        '","cf_location": "' +
        $("#location").val() +
        '","cf_point_of_contact": "' +
        $("#contact").val() +
        '","cf_additional_information": "' +
        $("#information").val() +
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
    });
  });