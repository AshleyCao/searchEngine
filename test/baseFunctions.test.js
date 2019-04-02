const BaseFuncations = require('../baseFunctions');

test('get search files users.json file', async () => {
    const userFile = new BaseFuncations('users');
    await userFile.readInData();
    expect(userFile.searchableField).toEqual(
        ["_id", "url", "external_id","name","alias","created_at","active","verified",
         "shared","locale", "timezone","last_login_at","email","phone","signature",
         "organization_id","tags","suspended","role"]);
});

test('search Item via tags in users.json file', async () => {
    const userFile = new BaseFuncations('users');
    await userFile.readInData();
    await userFile.seachItem('tags','Foxworth');
    expect(await userFile.findResult).toEqual([{"_id": 2, "active": true, "alias": "Miss Joni", "created_at": "2016-06-23T10:31:39 -10:00", "email": "jonibarlow@flotonic.com", "external_id": "c9995ea4-ff72-46e0-ab77-dfe0ae1ef6c2",
     "last_login_at": "2012-04-12T04:03:28 -10:00", "locale": "zh-CN", "name": "Cross Barlow", "organization_id": 106, "phone": "9575-552-585", "role": "admin", "shared": false, "signature": "Don't Worry Be Happy!", "suspended":
     false, "tags": ["Foxworth", "Woodlands", "Herlong", "Henrietta"], "timezone": "Armenia", "url": "http://initech.zendesk.com/api/v2/users/2.json", "verified": true}]);
});

test('search Item via due_at in tickets.json file', async () => {
    const ticketFile = new BaseFuncations('tickets');
    await ticketFile.readInData();
    await ticketFile.seachItem('due_at','2016-08-14');
    expect(await ticketFile.findResult).toEqual([]);
});

test('search Item via not existed tag in organizations.json file', async () => {
    const orgFile = new BaseFuncations('organizations');
    await orgFile.readInData();
    await orgFile.seachItem('faketag','2016-08-14');
    expect(await orgFile.findResult).toEqual([]);
});

test('search Item via not existed tag in organizations.json file', async () => {
    const fakeFile = new BaseFuncations('fakefile');
    await fakeFile.readInData();
    expect(fakeFile.fileError).toBe(true);
});

