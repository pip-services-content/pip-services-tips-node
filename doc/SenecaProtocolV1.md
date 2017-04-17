# Seneca Protocol (version 1) <br/> Tips Microservice

Tips microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8080, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'tips',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [DocumentReferenceV1 class](#class1)
* [PartyRefereneceV1 class](#class2)
* [TipV1 class](#class4)
* [cmd: 'get_tips'](#operation1)
* [cmd: 'get_random_tip'](#operation2)
* [cmd: 'get_tip_by_id'](#operation3)
* [cmd: 'create_tip'](#operation4)
* [cmd: 'update_tip'](#operation5)
* [cmd: 'delete_tip_by_id'](#operation6)

## Data types

### <a name="class1"></a> DocumentReferenceV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class4"></a> TipV1 class

Represents a system tip. 

**Properties:**
- id: string - unique tip id
- topics: string[] - list of topics
- creator: PartyReferenceV1 - party who created the tip
- create_time: Date - date and time when tip was created
- title: MultiString - (optional) tip title in multiple languages
- content: MultiString - tip textual content in multiple languages
- more_url: string - (optional) URL with additional information
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this tip
- docs: [DocumentReferenceV1] - (optional) array of attached documents
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## Operations

### <a name="operation1"></a> Cmd: 'get_tips'

Retrieves a list of tips by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - topics: string - (optional) list of topics
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of tip created interval
  - to\_create\_time: Date - (optional) end of tip created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<TipV1> - retrieved page with Tip objects

### <a name="operation2"></a> Cmd: 'get\_random\_tip'

Retrieves a random tip from filtered resultset

**Arguments:** 
- filter: object - filter parameters
  - topics: string - (optional) list of topics
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of tip created interval
  - to\_create\_time: Date - (optional) end of tip created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name

**Returns:**
- err: Error - occured error or null for success
- result: TipV1 - random Tip or null if nothing was found

### <a name="operation3"></a> Cmd: 'get\_tip\_by_id'

Retrieves tip by its unique id. 

**Arguments:** 
- tip_id: string - unique tip id

**Returns:**
- err: Error - occured error or null for success
- result: TipV1 - retrieved Tip object

### <a name="operation4"></a> Cmd: 'create_tip'

Creates a new system tip.

**Arguments:** 
- tip: TipV1 - a new annoucement to be created

**Returns:**
- err: Error - occured error or null for success
- result: TipV1 - created Tip object

### <a name="operation5"></a> Cmd: 'update_tip'

Updates tip.

**Arguments:** 
- tip: TipV1 - new tip values (partial updates are supported)

**Returns:**
- err: Error - occured error or null for success
- result: TipV1 - updated Tip object

### <a name="operation6"></a> Cmd: 'delete\_tip\_by_id'

Deletes system tip specified by its unique id.

**Arguments:** 
- tip_id: string - unique tip id

**Returns:**
- err: Error - occured error or null for success
- result: TipV1 - deleted Tip object


