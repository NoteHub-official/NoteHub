<template>
  <v-container class="fill-height">
    <v-card width="100%">
      <v-toolbar flat dense>
        <v-toolbar-title class="grey--text">
          <v-btn text @click="val++" class="text-capitalize px-5">
            Untitled Notebook {{ val }}
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>

      <v-card-text class="notex-content">
        <EditorContent :editor="editor" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import CodeEditor from "simple-code-editor";

export default {
  name: "LandingPage",
  components: {
    EditorContent,
    CodeEditor,
  },
  data() {
    return {
      val: 0,
      editor: null,
      code: "",
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Image, Dropcursor],
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Relational Data Model" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Data Model" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "A " },
              { type: "text", marks: [{ type: "bold" }], text: "data model" },
              {
                type: "text",
                text:
                  " is a notation for describing data or information. Th description generally consists of three parts:",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Structure of the data:" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text: "Data structures used to implement data in the computer.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Operation on the data:" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text:
                                  "Limited set of queries (operations that retrieve information) and modifications (operations that change the database).",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Constraints on the data:" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text:
                                  "Ways to describe limitation on what the data can be. These constraints often come from the real-world application requirements.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  'Begin with a paper by E.F. Codd in 1970, "A relational model of data in large shared data banks".',
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Separate physical implementation from logical." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Describe the data and operations mathematically (relational algebra).",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [
              { type: "text", text: "Relational Databases from a Practical Point of View" },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Account Table" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Table Name" },
                      { type: "text", text: ": Account." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Name of Columns (attributes)",
                      },
                      { type: "text", text: ": Number, Owner, Balance, Type." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Schema" },
                      {
                        type: "text",
                        text:
                          ": sets the structure (definition) of the table. (Table name, Column Name, Type)",
                      },
                    ],
                  },
                  { type: "paragraph" },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Table Rows" },
                      { type: "text", text: ": or tuple, record." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Table instace" },
                      { type: "text", text: ": always changing." },
                    ],
                  },
                  { type: "paragraph" },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Intension vs. Extension" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Schema is the " },
                      { type: "text", marks: [{ type: "bold" }], text: "intension" },
                      { type: "text", text: " of the table." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Instance is the " },
                      { type: "text", marks: [{ type: "bold" }], text: "extension" },
                      { type: "text", text: " of the table." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Size of a Table" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Degree (arity)" },
                      { type: "text", text: ": the number of columns." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Cardinality" },
                      { type: "text", text: ": the number of rows in the current instance." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Table Keys" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Primary Key" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Primary key must be unique and is not Null." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Each table has a key where the values must be " },
                      { type: "text", marks: [{ type: "bold" }], text: "unique" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Key may consists of one column or two (or more) columns.",
                      },
                    ],
                  },
                  { type: "paragraph" },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Connection Between Tables" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Foreign Key" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Foreign key must reference the primary key in another table.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "We say that Deposit.AccNo is a foreign key that reference Account.Number. If DBMS enforces this constraint, we have ",
                      },
                      { type: "text", marks: [{ type: "bold" }], text: "referential integrity" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Account is a reference table." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Deposit is a referencing table." }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Foreign keys might or might not be part of the key for the referring table.",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Specification of a Database Schema" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Select the tables, with a name for each table." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Select columns for each table and give the domain for each column.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Specify the key(s) for each table." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Specify all appropriate foreign keys." }],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Database Domains for Columns" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "For every column of every table, the schema specifies " },
              { type: "text", marks: [{ type: "bold" }], text: "allowable values" },
              { type: "text", text: "." },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Number: must be a 2-digit number." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Owner: must be a 30-character string." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: 'Type: must be "checking" or "savings.' }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "The set of allowable values for a column is called " },
              { type: "text", marks: [{ type: "bold" }], text: "domain" },
              { type: "text", text: " of the column." },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Example Database Schema" }],
          },
          { type: "paragraph" },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Structured Query Language" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "Separated into" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "DDL (data definition language)" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "DML (data manipulation language)" }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "DML based on relation calculus." }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "The principal from of a single-relation query is:" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT -- desired attributes\nFROM -- one table (relation)\nWHERE -- condition about tuples of the table\n",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "The " },
                      { type: "text", marks: [{ type: "bold" }], text: "FROM" },
                      { type: "text", text: " clause tells us the input tables." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "The " },
                      { type: "text", marks: [{ type: "bold" }], text: "WHERE" },
                      {
                        type: "text",
                        text: " clause is evaluated for all rows from the input table.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "The " },
                      { type: "text", marks: [{ type: "bold" }], text: "SELECT" },
                      {
                        type: "text",
                        text: " clause tells which columns to keep in the query anser.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Renaming Attributes" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "AS" },
                      { type: "text", text: " <new_name>" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Creating Temporary Table using INTO" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: 'SELECT Owner INTO Temp3\nFROM Account\nWHERE Type = "checking";\n',
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Temps can be used as a table in subsequent queries.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "REMEMBER to delete temporary tables." }],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "WHERE Clause Syntax" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "What can be used in WHERE:" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "attribute names of the relation(s) used in the FROM",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "comparison operators: =, <>, <, >, <=, >=" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "apply arithemetic opeations: stickprice * 2" },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "operations, comparision on strings" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "pattern matching, s LIKE p" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "special stuff for comparing dates and times" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Patterns and LIKE" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "WHERE clauses can have confitions in which a string is compared with a pattern to see if it matches.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "General form:" }] },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "<Attribute> LIKE <pattern>\n<Attribute> NOT LIKE <pattern>\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Pattern is a quoted string with:" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "%" },
                              { type: "text", text: ": any string." },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "_" },
                              { type: "text", text: ": any character." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "SELECT name\nFROM Customers\nWHERE phone LIKE '%555-_ _ _ _';\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "ORDER the results" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Account \nWHERE Name LIKE 'J%'\nORDER BY Balance, Age ASC -- default\n",
              },
            ],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Multi-Relation Queries (Joins)" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Multi-Relation Queries" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Address several relations in one query by listing them all in the FROM clause.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Distinguish attributes of the same name by " },
                      { type: "text", marks: [{ type: "bold" }], text: "<relation>.<attribute>" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT A.Owner, A.Balance\nFROM Account A, Deposit D\nWHERE D.AcctNo = A.Number AND A.Balance > 1000;\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: '"' },
                      { type: "text", marks: [{ type: "bold" }], text: "A" },
                      { type: "text", text: '" is a correlation name for ' },
                      { type: "text", marks: [{ type: "bold" }], text: "Account" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: '"' },
                      { type: "text", marks: [{ type: "bold" }], text: "D" },
                      { type: "text", text: '" is a correlation name for ' },
                      { type: "text", marks: [{ type: "bold" }], text: "Deposit" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Correlation names are like local variables - they hold one tuple or row from the corresponding table.",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Joins - Cross Product" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Every combinations in two tables." }],
          },
          { type: "paragraph" },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "SELECT *\nFROM Department, Employee\n" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Equi Join" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Employee E JOIN Department D\n\t\tON E.DepartmentID = D.DepartmentID\n",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Natural Join" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Only show one copy of joining attributes." }],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: "SELECT *\nFROM Employee E NATURAL JOIN Department D\n" },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "NULL Values" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Tuples in SQL relations can have NULL as a value for one or more components.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Meaning:" }] },
                  {
                    type: "orderedList",
                    attrs: { start: 1 },
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [{ type: "text", text: "Missing Value." }],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text:
                                  "Inapplicable: the value of attribute spouse for an unmarried person.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Comparing NULL's to Values" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "The logic of conditions in SQL is really 3-valued logic: ",
                      },
                      { type: "text", marks: [{ type: "bold" }], text: "TRUE (1)" },
                      { type: "text", text: ", " },
                      { type: "text", marks: [{ type: "bold" }], text: "FALSE (0)" },
                      { type: "text", text: ", " },
                      { type: "text", marks: [{ type: "bold" }], text: "UNKNOWN (0.5)" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Comparison" },
                      {
                        type: "text",
                        text: ": When any values compared with NULL, the truth value will be ",
                      },
                      { type: "text", marks: [{ type: "bold" }], text: "UNKNOWN" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Outcome" },
                      {
                        type: "text",
                        text:
                          ": A query only produces a tuple in the answer if its truth value for the WHERE caluse is TRUE (not FALSE, or UNKNOWN).",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "AND = MIN; OR = MAX; NOT(x) = 1 - x." }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Example 1" },
              { type: "text", text: ":" },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "TRUE AND (FALSE OR NOT(UNKNOWN))" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "= MIN(1, MAX(0, (1 - 0.5))) = 0.5" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Example 2" },
              { type: "text", text: ":" },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Person \nWHERE (age < 25) AND (height > 6 OR weight > 190);\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "age = 20" }] }],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "height = NULL" }] },
                ],
              },
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "weight = 200" }] }],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "= TRUE AND (UNKNOWN OR TRUE) = MIN(1, MAX(0.5, 1)) = 1" },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Outer Joins" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Left Outer Join:" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text: "Include the left tuple even if there's no match.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Right Outer Join:" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text: "Include the right tuple even if there's no match.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Full Outer Join:" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text:
                                  "Include both the left and right tuples even if there's no match.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Left Outer Join" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Employee E LEFT OUTER JOIN Department D\n\t\tON E.DepartmentID = D.DepartmentID\n",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Right Outer Join" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Employee E RIGHT OUTER JOIN Department D\n\t\tON E.DepartmentID = D.DepartmentID\n",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Full Outer Join" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Employee E FULL OUTER JOIN Department D\n\t\tON E.DepartmentID = D.DepartmentID\n",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Subqueries" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "A parenthesized SELECT-FROM-WHERE statement (subquery) can be used as a value in a number of places.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  'SELECT *\nFROM (SELECT * FROM Customer WHERE name LIKE "A%") as T\nWHERE T.phone LIKE "5%";\n',
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "If a subquery is guaranteed to produce one tuple with one component, then the subquery can be used as a value.",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: '"Single" tuple often guaranteed by key constraint.',
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "A run-time error occurs if there's no tuple or more than one tuple.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "WHERE price = (SELECT * FROM ... WHERE ...) -- must be a scalar value\n",
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "Example" }] },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "From Sells(cafe, drink, price), find the café shops that serve Latte for the same price Espresso Royal charges for Cappuccino. Two queries would surely work:",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Find the price Espresso Royal charges for Cappuccino.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Find the café shops that serve Latte at that price.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  'SELECT \n\tS.cafe\nFROM Sells S\nWHERE drink = "Latte" AND price = (\n\tSELECT DISTINCT \n\t\tprice \n\tFROM Sells \n\tWHERE cafe = "Espresso Royal" AND drink = "Cappuccino"\n)\n',
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Boolean Operators" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "IN Operaor" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "<tuple> IN <relation>\n<tuple> NOT IN <relation>\n" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "From Drinks(name, manf) and Likes(customer, drink), find the name and manufacturer of each drink that Fred likes.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  'SELECT *\nFROM Drinks\nWHERE name IN (\n\tSELECT drink\n\tFROM Likes\n\tWHERE customer = "Fred"\n)\n',
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Exists Operator" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "EXISTS(<relation>)" },
                      {
                        type: "text",
                        text: " is true if and only if the <relation> is not empty.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "From Drinks(name, manf), and Sells (café, drink, price) find the name and manufacturer of drinks with price >= $4.99.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Drinks\nWHERE name IN (\n\tSELECT drink\n\tFROM Sells\n\tWHERE price >= 4.99\t\n)\n",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Drinks D\nWHERE EXISTS(\n\tSELECT *\n\tFROM Sells S\n\tWHERE D.name = S.drink AND S.price >= 4.99\n)\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "ANY Operator" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "x = ANY(<relation>)" },
                      {
                        type: "text",
                        text: " means x equals to at least one tuple in the relation.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "x ≥ ANY(<relation>)" },
                      {
                        type: "text",
                        text:
                          " means x is greater than or equal to at least one tuple in the relation.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Tuple must have one component only!",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "ALL Operator" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "x <> ALL(<relation>)" },
                      {
                        type: "text",
                        text:
                          " is true if and only if x is not equal to every tuple t in relation.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "x ≥ ALL(<relation>)" },
                      {
                        type: "text",
                        text: " means there is x is larger than every tuple in the relation.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "From Sells(cafe, drink, price), find the drink(s) sold for the highest price.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT *\nFROM Sells\nWHERE price >= ALL(\n\tSELECT price\n\tFROM Sells\n)\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Set Operations" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Union, intersection, and difference of relations are expressed by the following forms, each involving subqueries:",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "(subquery) UNION (subquery)" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "(subquery) INTERSECT (subquery)" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "(subquery) EXCEPT (subquery)" }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Make sure two subquery are union competible!",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT name\nFROM Drink\nUNION\nSELECT drink AS name -- make sure column names and domain are the same\nFROM Sells\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "From relations Likes(customer, drink), Sells(cafe, drink, price) and Frequents(customer, cafe), find the customers and drinks such that:",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "The customer likes the drink, and" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "The customer frequents at least one café shop that sells the drink.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT \n\tcustomer,\n\tdrink\nFROM Likes\nINTERSECT \nSELECT \n\tF.customer,\n\tS.drink\nFROM Frequents F\nNATURAL JOIN Sells S\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Controlling Duplicate Elimination" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Force the result to be a set by" }],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "SELECT DISTINCT\n" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Force the result to be a bag by ALL, as in" }],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "... UNION ALL ...\n" }],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Grouping & Aggregations" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "SUM, AVG, COUNT, MIN, MAX can be applied to a column in a SELECT clause to produce that aggregation on the column.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "From Sells(cafe, drink, price) find the average price of Mocha:",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: 'SELECT AVG(price)\nFROM Sells\nWHERE drink = "Mocha"\n' },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "DISTINCT" },
                      {
                        type: "text",
                        text:
                          " inside an aggregation causes duplicates to be eliminated before the aggregation.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "NULL" },
                      { type: "text", text: " never contributes to aggregation." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "If all value in a column are " },
                      { type: "text", marks: [{ type: "bold" }], text: "NULL" },
                      { type: "text", text: ", then the result of the aggregation is " },
                      { type: "text", marks: [{ type: "bold" }], text: "NULL" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: 'SELECT COUNT(*)\nFROM Sells\nWHERE drink = "Mocha"\n' },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: 'SELECT COUNT(price)\nFROM Sells\nWHERE drink = "Mocha"\n' },
            ],
          },
          { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Grouping" }] },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "From Sells(cafe, drink, price), find the average price for each drink:",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: "SELECT drink, AVG(price)\nFROM Sells\nGROUP BY drink;\n" },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text:
                          "SELECT only have attributes in GROUP BY clause, and aggregate functions! (Except if GROUP BY attribute is primary key)",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "From Sells(cafe, drink, price) and Frequents(customer, cafe), find for each customer the average price of Mocha at the cafes they frequent.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  'SELECT \n\tF.customer,\n\tAVG(S.price)\nFROM Sells S\nNATURAL JOIN Frequents F\nWHERE S.drink = "Mocha"\nGROUP BY F.customer;\n',
              },
            ],
          },
          { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "HAVING" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "HAVING <condition>" },
                      { type: "text", text: " may follow a GROUP BY clause." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "The condition applies to each group, and groups not satisfying the condition are eliminated.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Average price of drinks that are sold at least at three cafes.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "SELECT\n\tdrink,\n\tAVG(price)\nFROM Sells\nGROUP BY drink\nHAVING COUNT(cafe) >= 3;\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Attributes must be either 1) A grouping attribute, or 2) aggregated.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Views" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          'A view is a "virtual table", a relation that is defined in terms of the contents of other tables and views.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "CREATE VIEW <name> AS <query>;\n" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Views are not stored in the database." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "In contrast, a relation whose value is really stored in the database is called a ",
                      },
                      { type: "text", marks: [{ type: "bold" }], text: "base table" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE VIEW CanDrink AS\nSELECT customer, drink\nFROM Frequents, Sells\nWHERE Frequents.cafe = Sells.cafe;\n",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: 'SELECT drink \nFROM CanDrink\nWHERE customer = "Sally";\n' },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Can be used as relations in other queries" }],
                  },
                ],
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Allows the user to query things that make more sense.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Can be stored (materialized) as appropriate." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Sometimes can even be updated." }],
                  },
                ],
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 2 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Can facilitate security/access control" }],
                  },
                ],
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "We can assign users permissions on different views",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Can select or project so we only reveal what we want",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Describe transformations or mappings from one schema (the base relations) to another (the output of the view).",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Materialized Views" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "A " },
              { type: "text", marks: [{ type: "bold" }], text: "materialized view" },
              {
                type: "text",
                text: " is one that is computed once and its results are stored as a table.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "CREATE MATERIALIZED VIEW AS ...\n" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "View Maintenance and Updates" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "There exist algorithms to incrementally recompute a materialized view when the base relations change",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "We can try to propagate view changes to the base relations. However, there are lots of views that aren’t easily updatable.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "We can ensure views are updatable by enforcing certain constraints:",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "It is defined on a single base table.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Using only selection and projection.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", marks: [{ type: "bold" }], text: "No aggregates." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", marks: [{ type: "bold" }], text: "No DISTINCT." }],
                  },
                ],
              },
            ],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Insertion & Deletion & Update" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Insertion" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: "INSERT INTO <relation>\nVALUES (<list of values>);\n" },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Assume we know the order of attributes." }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "INSERT INTO Likes\nVALUES ('Sally', 'Latte');\n" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "Explicitly show attributes." }] },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "INSERT INTO Likes(drink, customer)\nVALUES ('Sally', 'Latte');\n",
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "Insert more than one" }] },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "INSERT INTO Likes(drink, customer)\nVALUES ('Sally', 'Latte'), ('Mocha', 'Abdu');\n",
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "Insert NULL value" }] },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "INSERT INTO Likes(customer)\nVALUES ('Sally'); -- drink is NULL\n",
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "Insert Many Tuples" }] },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "INSERT INTO <relation>\n(<subquery>);\n" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              { type: "text", text: "INSERT INTO Drinks(name)\nSELECT drink FROM Sells\n" },
            ],
          },
          { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Deletion" }] },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "DELETE FROM <relation>\nWHERE <condition>;\n" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "DELETE FROM Likes\nWHERE customer = 'Sally' AND drink = 'Latte';\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Delete all Tuples - no WHERE clause needed" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "DELETE FROM <relation>;\n" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Table is not deleted: use " },
                      { type: "text", marks: [{ type: "bold" }], text: "DROP TABLE" },
                      { type: "text", text: " statement instead." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Delete from Drinks (name, manf) all drinks for which there is another drink by the same manufacturer.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "DELETE FROM Drinks\nWHERE name IN (\n\tSELECT b1.name\n\tFROM Drinks b1, Drinks b2\n\tWHERE b1.manf = b2.manf AND b1.name <> b2.name);\n",
              },
            ],
          },
          { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Update" }] },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "UPDATE <relation>\nSET <list of attribute assignments>\nWHERE <condition on tuples>;\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "UPDATE Customer\nSET phone = '555-1212'\nWHERE name = 'Fred';\n",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "UPDATE Customer\nSET phone = '(217)' || phone\nWHERE name = 'Fred';\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Stored Procedures" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Stored Procedures in MySQL" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "A set of SQL statements stored in the DBMS and can be called by multiple programs.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE PROCEDURE sp_name\n\t(proc_parameter, ...)\nBEGIN\n\t-- execution code\nEND;\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "proc_parameter" },
                      { type: "text", text: ": [ IN | OUT | INOUT ] param_name param_type" },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "IN" },
                      {
                        type: "text",
                        text: ": parameters for passing values into the procedure",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "OUT" },
                      {
                        type: "text",
                        text:
                          ": parameters for passing value back from procedure to the calling program.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "INOUT" },
                      { type: "text", text: ": a combination of IN and OUT parameters." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "DELIMITER //\nCREATE PROCEDURE GetAverageScore ()\nBEGIN \n\tSELECT s.FirstName, s.LastName, AVG(Score) AS avgScore\n\tFROM Enrollments e JOIN Students s\n\t\tUSING (NetId)\n\tGROUP BY s.NetId;\nEND //\nDELIMITER ;\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Calling Procedure" }] },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "CALL GetAverageScore();\n" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "In stored procedures:" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "declare variables" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "use conditional IF-THEN-ELSE or loops such as WHILE and REPEAT statements",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "use cursors: A cursor is used to iterate through a set of rows returned by a query so that we can process each individual row.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Define a stored procedure that takes a department name and return the total number of students in that department.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "DELIMITER //\nCREATE PROCEDURE GetTotalStds (IN dept VARCHAR(30))\nBEGIN \n\tDECLARE totalStds INT DEFAULT 0 -- int totalStd = 0;\n\n\tSELECT COUNT(*)\n\tINTO totalStds\n\tFROM Students\n\tWHERE Department = dept;\n\n\tSELECT totalStds; -- return totalStds;\nEND //\nDELIMITER ;\n",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "CALL GetTotalStds('CS');\n" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Alternative way" }] },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "DELIMITER //\nCREATE PROCEDURE GetTotalStds (\n\tIN dept VARCHAR(30),\n\tOUT total INT)\nBEGIN\n\tSELECT CONUT(*)\n\tINTO total\n\tFROM Students\n\tWHERE Department = dept;\nEND //\nDELIMITER ;\n",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text: "CALL GetTotalStds('CS', @total);\nSELECT @total; -- getting the result\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Suppose we want to compute the average GPA for students per department and save the result in a new table DeptAvgGPA(deptName, AverageScore)",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "DELIMITER //\nCREATE PROCEDURE deptAvgGPA()\nBEGIN\n\tDECLARE done INT DEFAULT 0;\n\tDECLARE currdept VARCHAR(30);\n\tDECLARE deptcur CURSOR FOR SELECT DISTINCT department FROM students;\n\tDECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;\n\n\tDROP TABLE IF EXISTS deptAvgGPA;\n\tCREATE TABLE deptAvgGPA (\n\t\tdeptName VARCHAR(30),\n\t\tavgGPA REAL\n\t);\n\n\tOPEN deptcur;\n\t\n\tREPEAT\n\t\tFETCH deptcur INTO currdept;\n\t\tINSERT INTO deptAvgGPA (\n\t\t\tSELECT department, AVG(GPA) \n\t\t\tFROM students \n\t\t\tWHERE department = currdept);\n\t\t\tUNTIL done\n\tEND REPEAT;\n\n\tclose deptcur;\nEND //\nDELIMITER ;\n",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "SELECT * FROM deptAvgGPA;\n" }],
          },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Constraints" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Used to make sure data stored in the database make sense.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "A " },
                      { type: "text", marks: [{ type: "bold" }], text: "constraints" },
                      {
                        type: "text",
                        text:
                          " is a relationship among data elements that the DBMS is required to enforce.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Kinds of Constraints" }],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "Keys." }] }],
              },
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "Foreign-Key." }] }],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Value-based constraints." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Tuple-based constraints." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [{ type: "paragraph", content: [{ type: "text", text: "Assertions." }] }],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Foreign Keys" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "use the keyword REFERENCES, either:" }],
                  },
                  {
                    type: "orderedList",
                    attrs: { start: 1 },
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text:
                                  "Within the declaration of an attributes, when only one attribute is involved.",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [{ type: "text", text: "As an element of the schema." }],
                          },
                          {
                            type: "codeBlock",
                            attrs: { language: "sql" },
                            content: [
                              {
                                type: "text",
                                text:
                                  "FOREIGN KEY (<list of attributes>)\nREFERENCES <relation> (<attributes>)\n",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Referenced attributes must be declared " },
                      { type: "text", marks: [{ type: "bold" }], text: "PRIMARY KEY" },
                      { type: "text", text: " or " },
                      { type: "text", marks: [{ type: "bold" }], text: "UNIQUE" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example: With Attribute" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "-- Reference relation\nCREATE TABLE Drinks (\n\tname CHAR(20) PRIMARY KEY,\n\tmanf CHAR(20)\n);\n\n-- Referencing relation\nCREATE TABLE Sells (\n\tcafe CHAR(20),\n\tdrink CHAR(20) REFERENCES Drinks(name),\n\tprice REAL\n);\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example: As Element" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "-- Reference relation\nCREATE TABLE Drinks (\n\tname CHAR(20) PRIMARY KEY,\n\tmanf CHAR(20)\n);\n\n-- Referencing relation\nCREATE TABLE Sells (\n\tcafe CHAR(20),\n\tdrink CHAR(20),\n\tprice REAL,\n\tFOREIGN KEY(drink) REFERENCES Drinks(name)\n);\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Enforcing Foreign-Key Constraints",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "If there is a foreign-key constraint from attributes of relation R to the primary key of relation S, two violations are possible:",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "An insert or update to R introduces values not found in S.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: 'A deletion or update to S causes some tuples of R to "dangle".',
                      },
                    ],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "Default" },
                              { type: "text", text: ": Reject the modification." },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "Cascade" },
                              { type: "text", text: ": Make the same changes in R." },
                            ],
                          },
                          {
                            type: "bulletList",
                            content: [
                              {
                                type: "listItem",
                                content: [
                                  {
                                    type: "paragraph",
                                    content: [{ type: "text", text: "Deleted: delete R tuple." }],
                                  },
                                ],
                              },
                              {
                                type: "listItem",
                                content: [
                                  {
                                    type: "paragraph",
                                    content: [
                                      { type: "text", text: "Updated: change value in R." },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "Set NULL" },
                              { type: "text", text: ": Change the R tuple to NULL." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Choosing a Policy" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "When declaring a foreign key, we may choose ppolicies SET NULL or CASCADE independently for deletions and updates to S (the rederenced relation).",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "ON [UPDATE, DELETE][SET NULL, CASCADE]\n" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Otherwise, the default (reject) is used." }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE TABLE Sells (\n\tcafe CHAR(20),\n\tdrink CHAR(20),\n\tprice REAL,\n\tFOREIGN KEY(drink) \n\t\tREFERENCES Drinks(name)\n\t\tON DELETE SET NULL,\n\t\tON UPDATE CASCADE\n);\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Value-Based Checks" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Place a constraint on the value of a particular attribute.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "CHECK(<condition>" },
                      {
                        type: "text",
                        text: ") must be added to the declaration for the attribute.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "The condition may use " },
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "the name of the attribute",
                      },
                      { type: "text", text: ", but any other relation or attribute name " },
                      { type: "text", marks: [{ type: "bold" }], text: "must be in a subquery" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE TABLE Sells (\n\tcafe CHAR(20),\n\tdrink CHAR(20) CHECK (\n\t\tdrink IN (SELECT name FROM Drinks)),\n\tprice REAL CHECK (price <= 5.00),\n);\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "An attrbute-based check is checked " },
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "only when a value for that attribute is inserted or updated",
                      },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Tuple-Based Checks" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "CHECK(<condition>" },
                      {
                        type: "text",
                        text: ") may be added as another element of a schema definition.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "The condition may refer to many attribute of the relation, but any other attributes or relation require a subquery).",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  'CREATE TABLE Sells (\n\tcafe CHAR(20),\n\tdrink CHAR(20),\n\tprice REAL,\n\tCHECK (cafe = "Abdu\'s Cafe" OR price <= 5.00) \n);\n',
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Assertions" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "These are database-schema elements, like relations or views.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Must be true all time" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [{ type: "text", text: "CREATE ASSERTION <name> CHECK (<condition>);\n" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE ASSERTION FewCafe CHECK (\n\t(SELECT CONNT(*) FROM Cafes) <= (SELECT COUNT(*) FROM Customers)\n);\n",
              },
            ],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "SQL: Triggers" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "A trigger allows the user to specify when the check occurs.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Trigger has a general-purpose condition, but can also perform any sequence of SQL database modification).",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Event-Condition-Action Rules" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Event" },
                      { type: "text", text: ": typically a type of database modification." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Condition" },
                      { type: "text", text: ": Any Boolean-valued experession." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Action" },
                      { type: "text", text: ": Any SQL statements." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE TRIGGER DrinkTrig\n\tAFTER INSERT ON Sells -- Event\n\tFOR EACH ROW\nBEGIN\n\tSET @drink = (SELECT name FROM Drinks WHERE name = new.drink);\n\tIF @drink IS NULL THEN -- Condition\n\t\tINSERT INTO Drinks(name, manf) -- Action\n\t\tVALUES (new.drink, 'abdu');\n\tEND IF;\nEND;\n",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "AFTER" },
                      { type: "text", text: " can be " },
                      { type: "text", marks: [{ type: "bold" }], text: "BEFORE." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "INSERT" },
                      { type: "text", text: " can be " },
                      { type: "text", marks: [{ type: "bold" }], text: "DELETE" },
                      { type: "text", text: " or " },
                      { type: "text", marks: [{ type: "bold" }], text: "UPDATE" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Options" },
              { type: "text", text: ":" },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "FOR EACH ROW" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [{ type: "text", text: "Indicate row-level;" }],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "Executed once for each modified tuple." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Reference" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "INSERT statements imply a " },
                              { type: "text", marks: [{ type: "bold" }], text: "new" },
                              { type: "text", text: " tuple (for row-level) or " },
                              { type: "text", marks: [{ type: "bold" }], text: "new" },
                              { type: "text", text: " set of tuples." },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "DELETE implies an " },
                              { type: "text", marks: [{ type: "bold" }], text: "old" },
                              { type: "text", text: " tuple or set of tuples." },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [{ type: "text", text: "UPDATE implies both." }],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "Refer to these by [" },
                              { type: "text", marks: [{ type: "bold" }], text: "NEW/OLD" },
                              { type: "text", text: "]." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Condition" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "Any " },
                              { type: "text", marks: [{ type: "bold" }], text: "Boolean-valued" },
                              { type: "text", text: " condiiton is appropriate." },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text:
                                  "It is evaluated before or after the triggering event, depending on ",
                              },
                              { type: "text", marks: [{ type: "bold" }], text: "BEFORE" },
                              { type: "text", text: " or " },
                              { type: "text", marks: [{ type: "bold" }], text: "AFTER" },
                              { type: "text", text: " is used in the event." },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "Use " },
                              { type: "text", marks: [{ type: "bold" }], text: "new/old" },
                              { type: "text", text: " to access the new/old tuple (row)." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "Action" }] },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text: "There can be more than one SQL statemnet in the action.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Using Sells(cafe, drink, price) and a unary relation RipoffCafes(drink) created for the purpose of maintaining a list of cafes that raise the price of any drink by more than $1.",
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: "sql" },
            content: [
              {
                type: "text",
                text:
                  "CREATE TRIGGER PriceTrig\n\tAFTER UPDATE ON Sells -- Event\n\tFOR EACH ROW\nBEGIN\n\tIF new.price > old.price + 1.00 THEN -- Condition\n\t\tINSERT INTO RipoffCades VALUES (new.cafe); -- Action\n\tEND IF;\nEND;\n",
              },
            ],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Conceptual Database Design" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Relational Model has" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "Table" },
                              {
                                type: "text",
                                text:
                                  " with attributes, keys, foreign keys, domain definitions for attributes.",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Emtity-Relationship Model has" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                marks: [{ type: "bold" }],
                                text: "Entities and entity sets",
                              },
                              {
                                type: "text",
                                text:
                                  " with attributes, keys, foreign keys, domain definitions for attributes.",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                marks: [{ type: "bold" }],
                                text: "Relationships among entities and relationship sets",
                              },
                              { type: "text", text: " with uniqueness." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Example - Entity-Relationship Diagram",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Entity" },
                      {
                        type: "text",
                        text:
                          ": Real-world object distinguishable from other objects. Any entity is described using a set of attributes.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Entity Set" },
                      {
                        type: "text",
                        text: ": A collection of similar entities. E.g. all employees.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Relationship" },
                      { type: "text", text: ": Association among 2 or more entities." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Relationship Set" },
                      { type: "text", text: ": Collection of similar relationships." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Relationships" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Formal definition: if a A, B sets, then a relation R is a subset of A x B.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Multiplicity of ER Relationships" }],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Arrow:" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "one-to-one: 0 or 1" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "many-to-one: 0 or *" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "many-to-many: *" }] },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "UML version of the same ER Diagram" }],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Weak Entity Sets" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: 'Entities of an entity set need "help" to identity them uniquely.',
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Entity set E is weak if in order to identify entities of E uniquely, we need to follow one or more many-one relationships from and include the key of the related entity sets.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Note" },
              { type: "text", text: ": not an " },
              { type: "text", marks: [{ type: "bold" }], text: "is-a relationship" },
              { type: "text", text: " because E is not a subclass of F." },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Logical Database Design" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Converting ER to Relational Schema" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Translate each entity set into a table with keys." }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [
              { type: "text", text: "Translate each many-to-many relationship into a table" },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [
              { type: "text", text: "Create a foreign key for a 1-to-many relationship set." },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Weak Entity Sets" }],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Functional Dependency" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "May need to improve existing design." }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Start with original db schema R, identify functional dependencies.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Use them to transform R until we get a good design R*." },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Must preserve the information of R.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Must have minimal amount of redundancy.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: 'Must be dependency preserving".',
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Must also gives good query performance.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Normalization" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          'Converting a schema that doesn\'t obey rules to one that does is called "normalization".',
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Involves " },
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "decomposition into smaller tables",
                      },
                      { type: "text", text: "." },
                    ],
                  },
                  { type: "paragraph" },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Keys for a Table" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "For each key value, only one value for non-key attributes.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Functional Dependencies (FDs) generalize keys" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Def" },
              { type: "text", text: " If two tuple agree on the attributes," },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "A1, A2, A3, ..., An" }] },
          {
            type: "paragraph",
            content: [{ type: "text", text: "then they most also agree on the attributes." }],
          },
          { type: "paragraph", content: [{ type: "text", text: "B1, B2, B3, ..., Bm" }] },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Formally" },
              { type: "text", text: ": A1, A2, ..., An ——> B1, B2, ..., Bm" },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Likely" },
              { type: "text", text: " " },
              { type: "text", marks: [{ type: "bold" }], text: "functional dependencies" },
              { type: "text", text: ":" },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "SSN —> employeeName" }] },
          { type: "paragraph", content: [{ type: "text", text: "courseNumber —> courseTitle" }] },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Unlikely" },
              { type: "text", text: " " },
              { type: "text", marks: [{ type: "bold" }], text: "functional dependencies" },
              { type: "text", text: ":" },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "courseNumber —> book" }] },
          { type: "paragraph", content: [{ type: "text", text: "birthdate —> SSN" }] },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Will FDs be enforced?" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Consider " },
              { type: "text", marks: [{ type: "bold" }], text: "Emp" },
              { type: "text", text: "(ssn, name, phone, dnum, dept-name);" },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "dnum —> dept-name" }] },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Redundancy" }],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Solution: Lifting Troublesome FDs" }],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Basic Idea" },
              { type: "text", text: ": Identify all the (" },
              { type: "text", marks: [{ type: "bold" }], text: "non-trivial" },
              { type: "text", text: ") FDs in an application." },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Identify FDs that are implied by the keys." }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Identify FDs that are NOT implied by the keys - the troublesome ones.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Decompose a table with a troublesome FD into two or more tables by lifting each FD into a table of its own.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Keys, Caondidate Keys, Primary Keys" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "A key is the same as a candidate key (synonyms)." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "If we have two or more keys in a table, we pick one to be the primary key.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "A key is a minimal superkey, i.e. set of attributes which is a superkey and for which no subset is a superkey.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "(EmpID, SSN, Name, Address)" }] },
          {
            type: "paragraph",
            content: [{ type: "text", text: "EmpID is a key (candidate key)" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "SSN is a key (candidate key)" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "A key is a " },
              { type: "text", marks: [{ type: "bold" }], text: "minimal" },
              {
                type: "text",
                text:
                  " set of attributes in a relation whose values are guaranteed to uniquely identify tuples in the relations.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Superkey" },
              {
                type: "text",
                text:
                  ": Every key is (automatically) a superkey. A superkey is NOT necessarily a key.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Emp(SSN, name, phone, dept);" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "SSN is a key for this relation, (dept, SSN) is a superkey for this relation, but not a key.",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Inference Rules for FDs" }],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Splitting/Combining Rule",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "A1, A2, A3, ..., An —> B1, B2, ..., Bm" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Equivalent to:" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "A1, A2, A3, ..., An —> B1;" }] },
          { type: "paragraph", content: [{ type: "text", text: "A1, A2, A3, ..., An —> B2;" }] },
          { type: "paragraph", content: [{ type: "text", text: "..." }] },
          { type: "paragraph", content: [{ type: "text", text: "A1, A2, A3, ..., An —> Bm;" }] },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Trivial Functional Dependencies",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "A1, A2, ..., An —> A1" }] },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "In general, A1, A2, A3, ..., An —> B1, B2, ..., Bm." },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "If {B1, B2, ..., Bm} in {A1, A2, A3, ..., An}, we have trivial dependencies.",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "Transitive Closure Rule",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "IF A1, A2, A3, ..., An —> B1, B2, ..., Bm" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "AND B1, B2, ..., Bm —> C1, C2, ..., Ck" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "THEN A1, A2, A3, ..., An —> C1, C2, ..., Ck" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Algorithm 1: Closure of a Set of Attributes" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Given a set of attributes {A1, ..., An} and a set of FDs F. Find all attributes B such that: for all relations that satisfy F, they also satisfy: A1, ..., An —> B.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "The " },
              { type: "text", marks: [{ type: "bold" }], text: "closure" },
              {
                type: "text",
                text:
                  " of {A1, ..., An}, denoted {A1, ..., An}+, is the set of all such attributes B.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          { type: "paragraph" },
          {
            type: "codeBlock",
            attrs: { language: null },
            content: [
              {
                type: "text",
                text:
                  "Split the FDs in F so that evey FD has a single attribute on the right.\nStart with X = {A1, A2, ..., An}\n\nRepeat until X doesn't change do:\n\tIf **(B1, B2, ..., Bm --> C)** in F and **{B1, B2, ..., Bm}** in X and **C** not in X:\n\t\tadd C to X\n\tend\nend \n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Use 1" },
              { type: "text", text: ": To test if X is a (super) key." },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "By computing X+ and check if X+ contains " },
              { type: "text", marks: [{ type: "bold" }], text: "ALL" },
              { type: "text", text: " attributes of R." },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Also used to find " },
              { type: "text", marks: [{ type: "bold" }], text: "candidate keys" },
              { type: "text", text: "." },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Compute X+ for all sets X where X+ == all attributes.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Then list only the minimal X's." }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Use 2: Check if X+ —> Y holds." },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "By checking if Y is contained in X+." }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example 1" }],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example 2" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Closure of a set of FDs" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Given a relation schema R & a set F of FDs." }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Closure of F: F+ all FDs logically implid by F." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Answer: Is the FD logically implied by F?" }],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Boyce-Codd Normal Form" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Definition" },
              { type: "text", text: " A relation R is in BCNF if and only if:" },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Whenever there is a nontrivial FD: A1, A2, ..., An → B, then A1, A2, ..., An is a superkey for R.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "BCNF Decompisition" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Find a dependency that violates the BCNF condition:" },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "A1, A2, A3, ..., An → B1, B2, B3, ..., Bm" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Heuristic" },
              { type: "text", text: ": choose B1, B2, ..., Bm as " },
              { type: "text", marks: [{ type: "bold" }], text: "large" },
              { type: "text", text: " as possible." },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Algorithm" }],
          },
          {
            type: "codeBlock",
            attrs: { language: null },
            content: [
              {
                type: "text",
                text:
                  "**Input**: relation R, set S of FDs over R.\n1) check if R is in BCNF, if not:\n\t\ta) pick a violation FD f: A -> B\n\t\tb) compute A+\n\t\tc) create R1= A+, R2 = {A} U (R - A+)\n\t\td) compute all FDs over R1, using R and S. Repeat similarly for R2.\n\t\te) Repeat Step 1 for R1 and R2.\n2) Stop when all relations are BCNF, or are two-attributes.\n",
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "FD Projection Algorithm" }],
          },
          {
            type: "codeBlock",
            attrs: { language: null },
            content: [
              {
                type: "text",
                text:
                  "Input: relation R, set F of FDs over R, and relation R1 (projected from R)\n**Output**: t (the set of FDs that holds in R1)\n1) Compute X+ for every subset of R1 attributes.\n2) Add to t all non-trivial FDs in R1.\n3) Modify t by computing its minimal basis.\n",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          { type: "paragraph" },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "BCNF Decomposition is not",
                      },
                      { type: "text", text: " unique**!**" },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Lossless Decomposition" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text:
                  "BCNF is not always dependency preserving! It gives lossless join and less redundancy, but it does not gives us depdendency preservation.",
              },
            ],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Third Normal Form" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Definition A relation R is in 3rd normal form if:",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Whenever there is a nontrivial dependency A1, A2, ..., An → B for R, then ",
                      },
                      {
                        type: "text",
                        marks: [{ type: "bold" }],
                        text: "{A1, A2, ..., An} is a super-key for R",
                      },
                      { type: "text", text: ", OR " },
                      { type: "text", marks: [{ type: "bold" }], text: "B is part of a key" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Decomposing R into 3NF - Minimal Basis" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "A basis with all RHS singletons, where any modifications lead to no longer a basic, including:",
              },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Dropping attribute from LHS of a rule: " },
                      { type: "text", marks: [{ type: "bold" }], text: "compact rules" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Dropping a rule: " },
                      { type: "text", marks: [{ type: "bold" }], text: "small # of rules" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "codeBlock",
            attrs: { language: null },
            content: [
              {
                type: "text",
                text:
                  "1) R = F with all RHS singletons\n2) Repeat until convergence\n\t\tIf a rule minus an attribute from LHS is inferred form F, replace rule with\n\t\trule minus attribute from LHS.\n\t\tIf a rule is inferred from rest, drop it.\n",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Given R(A, B, C, D, E). F = {A → D, BC → AD, C → B, E → A, E → D}.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Find F', the minimal basis for F." }],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "BC → A, BC → D" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "BC → AD: C → A, C → D" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "A+ = {A}, C+ = {C, B, D}, C+ = {C, A, B, D}, E+ = {E, D}, E+ = {E, A, D}",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "F' = {A → D, C → A, C → B, E → A}" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Decomposing R into 3NF" }],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: 'Get a "minimal basis" G of given FDs.' }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "For each FD A → B in the minimal basis G, use AB as the schema of a new relation.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "If none of the schemas from step 2 is a superkey, add another relation whose schema is a key for the original relation.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Result will be lossless, will be dependency-preserving.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Example" }],
          },
          { type: "paragraph" },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Storage and Indexing" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Block Size vs. Record Size" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Index in Databases" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "An " },
                      { type: "text", marks: [{ type: "bold" }], text: "index" },
                      { type: "text", text: " speeds up selections on the " },
                      { type: "text", marks: [{ type: "bold" }], text: "search key field(s)" },
                      { type: "text", text: "." },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Search key = any subset fields of a relation" },
                    ],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", marks: [{ type: "bold" }], text: "Search key" },
                              { type: "text", text: " is " },
                              { type: "text", marks: [{ type: "bold" }], text: "not" },
                              { type: "text", text: " necessarily the same as a " },
                              { type: "text", marks: [{ type: "bold" }], text: "key" },
                              { type: "text", text: "." },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Entries in an index: (k, r), where:" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [{ type: "text", text: "k = the search key" }],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              { type: "text", text: "r = the " },
                              { type: "text", marks: [{ type: "bold" }], text: "record" },
                              { type: "text", text: " OR " },
                              { type: "text", marks: [{ type: "bold" }], text: "record id" },
                              { type: "text", text: " OR record ids OR pointers" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Data File" },
              { type: "text", text: ": has the data corresponding to a relation." },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "Index File" },
              { type: "text", text: ": has the index." },
            ],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "File consists of smaller units called " },
                      { type: "text", marks: [{ type: "bold" }], text: "blocks" },
                      { type: "text", text: ". (size 4KB or 8KB)" },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "index blocks < # data blocks" }],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Characteristics of Indexs" }],
          },
          { type: "paragraph", content: [{ type: "text", text: "Clustered/unclustered" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Clustered: records sorted in the search key order.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Unclustered: records are NOT sorted in the search key order.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "Dense/sparse" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Dense = each record has an entry in the index" },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Sparse = only some records have" }],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text:
                  "Primary/secondary • Primary = on the primary key • Secondary = on any attribute",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "MUST be SORTED!" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Duplicate Keys" }],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Unclustered Indexs" }],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Often for indexing other attributes than " },
              { type: "text", marks: [{ type: "bold" }], text: "primary key" },
              { type: "text", text: "." },
            ],
          },
          { type: "paragraph" },
          { type: "horizontalRule" },
          { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "B+ Trees" }] },
          { type: "heading", attrs: { level: 3 }, content: [{ type: "text", text: "Basics" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "B+ Trees are trees with nodes:" }],
                  },
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Nodes have keys and pointers to:" }],
                  },
                  {
                    type: "bulletList",
                    content: [
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [
                              {
                                type: "text",
                                text: "Other nodes [if the node is an internal node]",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "listItem",
                        content: [
                          {
                            type: "paragraph",
                            content: [{ type: "text", text: "Data Records [if the node is leaf]" }],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          { type: "paragraph", content: [{ type: "text", text: "Root Nodes:" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Every root node has at least " },
                      { type: "text", marks: [{ type: "bold" }], text: "TWO" },
                      { type: "text", text: " pointers." },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph", content: [{ type: "text", text: "Internal Nodes:" }] },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", text: "Parameter d = the " },
                      { type: "text", marks: [{ type: "bold" }], text: "degree" },
                      { type: "text", text: " (minimum number of search keys a node can have)" },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  { type: "paragraph", content: [{ type: "text", text: "n = max # keys" }] },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "When n is even: Each node has [d, 2d] keys (except root); n = 2d.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "At least half full at all times: d is the minimum amount it needs to be full.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "paragraph",
            content: [{ type: "text", marks: [{ type: "bold" }], text: "Examples" }],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "B+ Tree Design" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Key size = 4 bytes; Pointer size = 8 bytes; Block size = 4096 bytes",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "$$2d\\cdot 4+(2d+1)\\cdot 8 \\le 4096 \\\\ d = 170; 2d = 340$$",
              },
            ],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Types of Queries to answer with a B+ Tree:" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Exact key value:" },
                      { type: "text", text: " SELECT name from people WHERE age = 20" },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      { type: "text", marks: [{ type: "bold" }], text: "Range queries:" },
                      {
                        type: "text",
                        text: " SELECT name from people WHERE age ≥ 20 and age ≤ 70",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Searching a B+ Tree" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Blanaced - Uniform space utilization" }],
                  },
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Predictable organization" }],
                  },
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text:
                          "Predictable time (logarithmic) unbalanced can be linear in worst case.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Good for range queries." }],
                  },
                ],
              },
            ],
          },
          { type: "horizontalRule" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "HastTable" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Secondary storage: bucket = block" }],
          },
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: "Store in the block of bucket h(k) any record with key k",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "use overflow blocks when needed" }],
                  },
                ],
              },
            ],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Extensible Hash Table" }],
          },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Performance: Extensible Hash Table" }],
          },
          { type: "paragraph" },
          {
            type: "heading",
            attrs: { level: 1 },
            content: [{ type: "text", text: "Linear Hash Table" }],
          },
          { type: "paragraph" },
        ],
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.notex-content {
  min-height: 780px;
}
.btn {
  text-transform: none !important;
}

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
  min-height: 770px;

  font-size: 1rem;

  outline: none !important;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
      width: 100%;
      display: inline-block !important;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
