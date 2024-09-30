import React from "react";

function QuestionList({ questions, setQuestions }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setQuestions(questions.filter(question => question.id !== id));
      } else {
        console.error('Failed to delete question');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const handleCorrectAnswerChange = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
    .then(response => response.json())
    .then(updatedQuestion => {
      setQuestions(questions.map(question => 
        question.id === id ? updatedQuestion : question
      ));
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.prompt}</h3>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => handleCorrectAnswerChange(question.id, parseInt(e.target.value))}
              >
                {question.answers.map((_, index) => (
                  <option key={index} value={index}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;