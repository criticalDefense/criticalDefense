 $(document).ready(function () {
    // Javascript method's body can be found in assets/js/demos.js
    demo.initDashboardPageCharts();

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
                if (value.status == 2) {
                  tickets += "<tr>";
                  tickets += "<td>" + value.id + "</td>";
                  tickets += "<td>" + "John Smith" + "</td>";
                  tickets += "<td>" + "Analytist 1" + "</td>";
                  tickets +=
                    "<td >" +
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

    $(".search_icon").click(function () {
      var xmlhttp = new XMLHttpRequest();

      var theUrl = "static/assets/js/results.json";

      xmlhttp.open("GET", theUrl);

      xmlhttp.setRequestHeader("Content-Type", "application/json");

      xmlhttp.responseType = "json";

      xmlhttp.onload = function (e) {
        if (this.status == 201) {
          //API returns 201 (Created)

          console.log("response", this.response); // JSON response
        }
      };

      xmlhttp.send(JSON.stringify());

      var name = $("#inputSearch").val();
      console.log(name);
      var company = $("#inputCompany").val();
      console.log(company);

      var xmlhttp = new XMLHttpRequest();

      var theUrl = "http://3.20.206.8:5000/api/advancedtopic";

      xmlhttp.open("POST", theUrl);

      xmlhttp.setRequestHeader("Content-Type", "application/json");

      xmlhttp.responseType = "json";

      xmlhttp.onload = function (e) {
        if (this.status == 201) {
          //API returns 201 (Created)

          console.log("response", this.response); // JSON response
        }
        var data = xmlhttp.response.id;
        console.log("hi" + data);
        localStorage.setItem("searchID", JSON.stringify(data));
      };

      xmlhttp.send(
        JSON.stringify({
          Name: name,
          Organization: company,
          Token: "53b7e0fa52b1451fa254dca9ae9a8505",
        })
      );
      setTimeout(function () {
        var results = localStorage.getItem("searchID");
        console.log("data: ", JSON.parse(results));
        var data = JSON.parse(results);
        var apiUrl = "static/assets/js/results.json";
        console.log(apiUrl);
        var settings = {
          url: apiUrl,
          method: "GET",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
          var data = response;
          var items = data.results.map(function (result) {
            return result;
          });
          var results = "";
          $.each(items, function (key, value) {});
          console.log(items[0]);
          results += "<tr>";
          results += "<td>" + items[0].b8_source_datetime_created + "</td>";
          results += "<td>" + items[0].b8_contains_media + "</td>";
          results += "<td>" + items[0].b8_network + "</td>";
          results += "<td>" + items[0].b8_url + "</td>";
          results += "<td>" + items[0].b8_text + "</td>";
          results += "</tr>";

          $(".open").append(results);
        });
      }, 200);
    });
  });