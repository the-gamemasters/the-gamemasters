function createCharacter(req: any, res: any) {
  console.log('Character POST endpoint hit. req.body=', req.body);
  res.status(200).send('Success')
}

export {createCharacter}