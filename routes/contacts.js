//contacts.js
import express from "express";

const router = express.Router();

let contacts = [
  {
    id: 1,
    firstName: "Badem",
    lastName: "Sabirli",
    email: "badem@example.com",
    phone: "5554443322",
    tag: "Work",
  },
  {
    id: 2,
    firstName: "Maya",
    lastName: "Can",
    email: "maya@example.com",
    phone: "5556667788",
    tag: "Family",
  },
  {
    id: 3,
    firstName: "Reina",
    lastName: "İsis",
    email: "reina@example.com",
    phone: "1112223344",
    tag: "School",
  },
];
let nextId = contacts.length + 1;

//gets all contacts
router.get("/", (req, res) => {
  res.json(contacts);
});

//search functionality by using get
router.get("/search", (req, res) => {
  const searchQuery = req.query.q ? req.query.q.toLowerCase() : "";

  if (!searchQuery) {
    return res.status(400).json({ message: "A search query is needed." });
  }

  const results = contacts.filter(
    (c) =>
      (c.firstName && c.firstName.toLowerCase().includes(searchQuery)) ||
      (c.lastName && c.lastName.toLowerCase().includes(searchQuery)) ||
      (c.email && c.email.toLowerCase().includes(searchQuery)) ||
      (c.tag && c.tag.toLowerCase().includes(searchQuery))
  );

  res.json(results);
});

//get a specific contact by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res
      .status(404)
      .json({ message: `Contact cannot be found with the id: ${id}` });
  }

  res.json(contact);
});

//add a new contact
router.post("/", (req, res) => {
  const contactData = req.body;

  const newContact = {
    id: nextId++,
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    email: contactData.email,
    phone: contactData.phone,
    tag: contactData.tag,
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

//delete a contact by using id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = contacts.length;

  contacts = contacts.filter((c) => c.id !== id);

  if (contacts.length === initialLength) {
    return res
      .status(404)
      .json({ message: `Cannot found the cntact by the given id: ${id}` });
  }

  res.status(204).send();
});

// editing by writing all the data again by using put
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `Cannot found the contact with the id: ${id}` });
  }

  const contactData = req.body;

  contact.firstName = contactData.firstName;
  contact.lastName = contactData.lastName;
  contact.email = contactData.email;
  contact.phone = contactData.phone;
  contact.tag = contactData.tag;

  res.json(contact);
});

//partial update - edit by using patch
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `cannot find the contact with the given id: ${id}.` });
  }

  const contactData = req.body;

  if (contactData.firstName !== undefined) {
        contact.firstName = contactData.firstName;
    }
    if (contactData.lastName !== undefined) {
        contact.lastName = contactData.lastName;
    }
    if (contactData.email !== undefined) {
        contact.email = contactData.email;
    }
    if (contactData.phone !== undefined) {
        contact.phone = contactData.phone;
    }
    if (contactData.tag !== undefined) {
        contact.tag = contactData.tag;
    }

    res.json(contact);
});

export default router;
