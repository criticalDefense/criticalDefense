  $(document).ready(function () {
    $(window).load(function () {
      var yourdomain = "criticaldefenseus"; // Your freshdesk domain name. Ex., yourcompany
      var api_key = "7RBC0Ki8KRl8jWKdlKN"; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
      var pageURL = $(location).attr("href");
      var query_string = pageURL.split("//");
      var string_values = query_string[1].split(".");
      var string = string_values[0];
      function capital(s) {
        return s[0].toUpperCase() + s.slice(1);
      }
      cap = "Test1";
      console.log(string);
      console.log(cap);
      companyId = "";
      $.when(
        $.ajax({
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/companies ",
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            Authorization: "Basic " + btoa(api_key + ":x"),
          },
          success: function (data) {
            $.each(data, function (key, value) {
              if (value.name == cap) {
                companyId = value.id;
              }
            });
          },
        })
      ).then(
        $.ajax({
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets",
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            Authorization: "Basic " + btoa(api_key + ":x"),
          },
          success: function (data) {
            console.log(companyId);

            var tickets = "";
            $.each(data, function (key, value) {
              // Status code 2 is open tickets
              if (value.company_id == companyId) {
                console.log(value);
              }
              if (value.company_id == companyId) {
                tickets += "<tr>";
                tickets += "<td name='button'>" + '<button  data-toggle="modal" data-target="#exampleModal" class="ticketId badge badge-dark" name="'+value.id+'">' + value.id + "</button>" + "</td>";
                tickets += "<td>" + "John Smith" + "</td>";
                tickets += "<td>" + "Analytist 1" + "</td>";
                tickets +=
                  "<td>" +
                  value.custom_fields.cf_description_of_the_concern +
                  "</td>";
                if (value.status == 2) {
                  tickets += "<td>" + "open" + "</td>";
                  // Status code 5 is closed tickets
                } else if (value.status == 5) {
                  tickets += "<td>" + "closed" + "</td>";
                } else {
                  tickets += "<td>" + "pending" + "</td>";
                }
                tickets += "</tr>";
              }
            });
            $(".closed").append(tickets);
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
        })
      );
    });
    $("body").on("click", ".ticketId", function (e) {
       var yourdomain = "criticaldefenseus"; // Your freshdesk domain name. Ex., yourcompany
      var api_key = "7RBC0Ki8KRl8jWKdlKN"; // Ref: https://support.freshdesk.com/support/solutions/articles/215517-how-to-find-your-api-key
        var link_id = $(this).attr("name");
        e.preventDefault();
        console.log(link_id);
         $.ajax({
          url: "https://" + yourdomain + ".freshdesk.com/api/v2/tickets/" + link_id,
          type: "GET",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          headers: {
            Authorization: "Basic " + btoa(api_key + ":x"),
          },
           success: function (data) {
            console.log(data);
            document.getElementById("ticket").innerHTML = "Ticket Number:" + " " + data.id;
            document.getElementById("spnPerson").innerHTML = data.custom_fields.cf_persons_displaying_concerning_behaviornameageresidence_address;
            document.getElementById("spnConcern").innerHTML = data.custom_fields.cf_description_of_the_concern;
            document.getElementById("spnPlace").innerHTML = data.custom_fields.cf_when_and_where_is_the_incidentaction_going_to_occur;
            document.getElementById("spnAware").innerHTML = data.custom_fields.cf_is_anyone_else_aware_of_the_concern;
            document.getElementById("spnWho").innerHTML = data.custom_fields.cf_if_yes_who;
            document.getElementById("spnInfo").innerHTML = data.custom_fields.cf_additional_information;
            document.getElementById("spnInvest").innerHTML = data.custom_fields.cf_would_you_like_to_speak_to_a_investigator;
            document.getElementById("spnPhone").innerHTML = data.custom_fields.cf_if_yes_please_provide_your_name_andor_phone_number;
            document.getElementById("spnName").innerHTML = data.custom_fields.cf_description_of_the_concern;
            document.getElementById("spnDate").innerHTML = data.custom_fields.cf_date_and_time;
            document.getElementById("spnVenue").innerHTML = data.custom_fields.cf_event_venue;
            document.getElementById("spnLocation").innerHTML = data.custom_fields.cf_location;
            document.getElementById("spnContact").innerHTML = data.custom_fields.cf_point_of_contact;
            document.getElementById("spnAddInfo").innerHTML = data.custom_fields.cf_additional_information;
          },
        })
      })
  });