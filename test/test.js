const request = require('supertest');
const app = require('../backend/backupServer.js');
const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);

describe('User Registration', () => {
  const agent = request.agent(app);
  // it('get WAnode', () => {
  //   agent.get('/WAnode?query=1&key=n').expect(200).end((err, res) => {
  //     chai.expect(res.body).to.be.an('array');
  //   });
  // });

  it('get key', async () => {
    const res = await agent.get('/key').expect(200);
    console.log(res.text);
    chai.expect(res.text).to.include('-----BEGIN PUBLIC KEY-----');
  });
});
