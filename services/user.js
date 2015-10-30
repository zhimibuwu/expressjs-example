var userStore = require('../stores/user.js');

module.exports.LinkApp = function(app) {
	app.get('/api/users', function(req, res) {
		userStore.getAll(function(users) {
			res.json(users);
		});
	});

	app.get('/api/users/:id', function(req, res) {
		var listId = req.params.id;
		userStore.get(listId, function(list, error) {
			if (error) return res.sendStatus(400);
			res.json(list);
		});
	});

	app.post('/api/users', function(req, res) {
		var list = req.body;
		if (!list) return res.sendStatus(400);
		userStore.save(list, function(list, error) {
			if (error) return res.sendStatus(400);
			res.json(list);
		});
	});

	app.put('/api/users/:id', function(req, res) {
		var listId = req.params.id;
		var listUpdate = req.body;
		if (!listUpdate) return res.sendStatus(400);
		userStore.get(listId, function(list, error) {
			if (error) return res.sendStatus(400);
			listUpdate.id = list.id;
			userStore.save(listUpdate, function(list, error) {
				if (error) return res.sendStatus(400);
				res.json(list);
			});
		});
	});

	app.delete('/api/users/:id', function(req, res) {
		var listId = req.params.id;
		userStore.get(listId, function(list, error) {
			if (error) return res.sendStatus(400);
			userStore.delete(list, function(list, error) {
				if (error) return res.sendStatus(400);
				res.json(list);
			});
		});
	});
};
