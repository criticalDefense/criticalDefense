import os
import requests
from freshdesk.api import API
import json
import requests



class NotImplemented(Exception):
    pass

class MissingAPIURL(Exception):
     def __str__(self):
         return 'i. freshdesk_api.FreshDeskAPI(https://newaccount1601031146507.freshdesk.comapi_url=settings.FRESHDESK_URL)'


class FreshDeskAPI(object):
    
    'You can initialize it like this:'
    fd = API('https://newaccount1601031146507.freshdesk.com', '1AjEc4sE7MU7pGA4NOZM')
    
    def __init__(self, *args, **kwargs):
        try:
            self.api_url = kwargs['api_url']
        except KeyError:
            raise MissingAPIURL()

        try:
            self._username = kwargs['username']
        except KeyError:
            pass

        try:
            self._password = kwargs['password']
        except KeyError:
            self._password = 'X'

    def call(self, url, params=None):
        """
        Makes an API GET Call.
        """
        fq_url = self.api_url + '/' + url
        resp = requests.get(fq_url, params=params, auth=(self._username, self._password))
        return json.loads(resp.content)

    def post(self, url, data={}):
        """
        Makes an API POST Call.
        """
        fq_url = self.api_url + '/' + url
        headers = {'Content-Type': 'application/json'}
        resp = requests.post(fq_url, data=json.dumps(data), headers=headers, auth=(self._username, self._password))
        return json.loads(resp.content)

    def login(self, username, password='X', skip_test=True):
        """
        Can be your username and password or the API Key alone as the first parameter.
        """
        self._username = username
        self._password = password

        # Do a simple API call to test it.
        if not skip_test:
            self.call(url='helpdesk/tickets.json')

    def get_tickets(
        self, default_filters=None, requestor=None, custom_ticket_views=None, **kwargs
    ):
        """
        See http://freshdesk.com/api#view_all_ticket
        """
        url = '/api/v2/tickets'

        if default_filters or requestor or custom_ticket_views:
            raise NotImplemented('default_filters, requestor and custom_ticket_views are not implemented')

        tickets = self.call(url, params=kwargs)

        for x, t in enumerate(tickets):
            tickets[x]['created_at'] = iso8601.parse_date(t['created_at'])
            tickets[x]['due_by'] = iso8601.parse_date(t['due_by'])
            tickets[x]['frDueBy'] = iso8601.parse_date(t['frDueBy'])
            tickets[x]['url'] = '%s/helpdesk/tickets/%s' % (self.api_url, t['display_id'])

        return tickets

    def create_ticket(
        self, subject, description, email, priority=2, status=2, cc_emails='', **kwargs
    ):
        """
        See http://freshdesk.com/api#create_ticket
        """
        post_dict = {
            'helpdesk_ticket': {
                'description': description,
                'subject': subject,
                'email': email,
                'priority': priority,
                'status': status,
            },
            'cc_emails': cc_emails,
        }
        post_dict['helpdesk_ticket'].update(kwargs)
        return self.post('helpdesk/tickets.json', post_dict)

    def add_note(self, ticket_id, body, private=True):
        """
        See http://freshdesk.com/api#add_note_to_a_ticket
        """
        post_dict = {
            'helpdesk_note': {
                'body': body,
                'private': private,
            },
        }
        return self.post('helpdesk/tickets/%s/conversations/note.json' % ticket_id, post_dict)