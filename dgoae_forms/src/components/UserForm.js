import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import "./UserForm.css";

import axios from "axios";

function UserForm() {
  const { global_id } = useParams();

  var [quest_excel, setColumn] = useState([]);
  var navigate = useNavigate();
  var [answer, setAnswer] = useState([]);

  const [doc_name, setDocName] = useState("Untitled Document");
  const [doc_desc, setDocDesc] = useState("Add Description");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getForm() {
      var request = await axios.get(
        `http://localhost:9000/getform?global_id=${global_id}`
      );
      var question_data = request.data.questions;
      var doc_name = request.data.document_name;
      var doc_desc = request.data.document_description;

      question_data.map((q, qindex) => {
        answer.push({
          question: q.questionText,
          answer: " ",
        });
      });

      question_data.map((q, qindex) => {
        quest_excel.push({ header: q.questionText, key: q.questionText });
      });

      setDocName(doc_name);
      setDocDesc(doc_desc);
      setQuestions(question_data);
    }

    getForm();
  }, []);

  var post_answer_data = {};

  function select(que, option, e) {
    setAnswer(answer);
    console.log(que, option, e, answer);

    var k = answer.findIndex((ele) => ele.question === que);
    answer[k].answer = option;
    setAnswer(answer);
    console.log(answer);
  }

  function selectInput(que, option) {
    setAnswer(answer);
    console.log(que, option);
    var k = answer.findIndex((ele) => ele.question === que);
    answer[k].answer = option;
    setAnswer(answer);
    console.log(answer);
  }

  function selectCheck(que, option, e) {
    setAnswer(answer);
    console.log(e, que, option);

    var d = [];
    var k = answer.findIndex((ele) => ele.question === que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e === true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option === option);
      d.splice(n, 1);
    }
    answer[k].answer = d.join(",");
    setAnswer(answer);
    console.log(answer);
  }

  function submit() {
    answer.map((ele) => {
      post_answer_data[ele.question] = ele.answer;
    });

    axios.post(`http://localhost:9000/student_response`, {
      
      global_id: global_id,
      column: quest_excel,
      doc_name: doc_name,
      answer_data: [post_answer_data],
    });

    navigate("/submitted/" + global_id);
  }

  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_section">
          <div className="user_title_section">
            <Typography style={{ fontSize: "26px" }}>{doc_name}</Typography>
            <Typography style={{ fontSize: "15px" }}>{doc_desc}</Typography>
          </div>
          {questions.length > 0 ? (
            questions.map((question, qindex) => (
              <div className="user_form_questions" key={qindex}>
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    letterSpacing: ".1px",
                    lineHeight: "24px",
                    paddingBottom: "8px",
                  }}
                >
                  {qindex + 1}. {question.questionText}
                </Typography>
                {question.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: "5px" }}>
                    <div style={{ display: "flex" }}>
                      <div className="form_check">
                        {question.questionType !== "radio" ? (
                          question.questionType !== "text" ? (
                            <label>
                              <input
                                type="checkbox"
                                name={qindex}
                                value={option.optionText}
                                className="form_check_input"
                                required={question.required}
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                                onChange={(e) => {
                                  selectCheck(
                                    question.questionText,
                                    option.optionText,
                                    e.target.checked
                                  );
                                }}
                              />
                              {option.optionText}
                            </label>
                          ) : (
                            <label>
                              <input
                                type="text"
                                name={qindex}
                                className="form_check_input_text"
                                required={question.required}
                                style={{
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                                onChange={(e) => {
                                  selectInput(
                                    question.questionText,
                                    e.target.value
                                  );
                                }}
                              />
                              {""}
                            </label>
                          )
                        ) : (
                          <label>
                            <input
                              type="radio"
                              name={qindex}
                              value={option.optionText}
                              className="form_check_input"
                              required={question.required}
                              style={{ marginLeft: "5px", marginRight: "5px" }}
                              onChange={(e) => {
                                select(
                                  question.questionText,
                                  option.optionText,
                                  e.target.value
                                );
                              }}
                            />
                            {option.optionText}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="user_form_questions">
              <Typography
                style={{
                  fontSize: "24px",
                  fontWeight: "400",
                  letterSpacing: ".2px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                }}
              >
                Comunicate con el propietario para habilitar el formulario.
              </Typography>
            </div>
          )}

          <div className="user_form_submit">
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              style={{ fontSize: "14px" }}
            >
              Guardar
            </Button>
          </div>

          <div className="user_footer">DGOAE-FORMS</div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
