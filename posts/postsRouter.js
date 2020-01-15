const express = require("express");

const router = express.Router();

const db = require("../data/db.js");

router.use(express.json());

// Creates a post using the information sent inside the `request body`.

router.post("/", (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res.status(400).json({
			error: "Please provide title and contents for the post."
		});
	} else {
		db.insert({ title, contents })
			.then(post => {
				res.status(201).json(post);
			})
			.catch(error => {
				console.log("error on POST /api/posts", error);
				res.status(500).json({
					error:
						"There was an error while saving the post to the database."
				});
			});
	}
});

//Creates a comment for the post with the specified id using information sent inside of the `request
//not working below need to fix

router.post("/:id/comments", (req, res) => {
	const { text } = req.body;
	const { id } = req.params;

	db.findById(id).then()
	if (!id) {
		res
			.status(404)
			.json({ error: "The post with the specified ID does not exist." });
	}
	if (!text) {
		res
			.status(400)
			.json({ errorMessage: "Please provide text for the comment." });
	} else {
		db.insertComment(req.params.comment)
			.then(newComment => {
				res.status(201).json(newComment);
			})
			.catch(error => {
				console.log("error on POST /api/posts", error);
				res.status(500).json({
					error: {
						error: "There was an error while saving the comment to the database"
					}
				});
			});
	}
});// this closes the router.post

//Returns an array of all the post objects contained in the database.   

router.get("/",(req,res) => {
    db.find()
        .then(posts => {
            console.log(posts,"posts");
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err,"error");
            res.status(500).json({ error: "The posts information could not be retrieved." })
        });

});

//GET by post by id
// need to fix no error 404

router.get("/:id",(req,res) => {
    const id= req.params.id;

    db.findById(id)
    .then(post => {
        if (!id) {
            res.status(404).json({error: "The post with the specified ID does not exist. "})
        }
        else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    });
});

//`GET` request to `/api/posts/:id/comments`:
router.get('/:id/comments', (req,res)=> {
    const id = req.params.id;
    db.findPostComments(id)
        .then(comment => {
            if(!comment) {
                res.status(404).json({ error: "The post with the specified ID does not exist." })
            }
            else {
                res.status(200).json(comment)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        });
});

//`DELETE` request to `/api/posts/:id`

router.delete('/:id',(req,res) => {
    const id = req.params.id;

    db.remove(id)
    .then(post => {
        if(!id) {
            res.status(404).json({ error: "The post with the specified ID does not exist." })
        }
        else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    });
});

// `PUT` request to `/api/posts/:id`:

router.put("/:id",(req,res) => {
    const id = req.params.id;
    const post = req.body;
    const { title, contents } = post;


    db.update(id,post)
    .then(post => {
        if (!id) {
            res.status(404).json({ error: "The post with the specified ID does not exist." })
        }
        if (!title || ! contents) { 
            res.status(400).json({ error: "Please provide title and contents for the post." })
        }
        else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post information could not be modified." })
    })
    

})



module.exports = router;
