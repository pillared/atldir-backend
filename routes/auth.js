app.post('/api/login', async (req, res) => {
    try {
      const didToken = req.headers.authorization.substr(7);
      await magic.token.validate(didToken);
      res.status(200).json({ authenticated: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });