import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function geenrateAnswer() {
        setIsLoading(true);
        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?" +
                    "key=AIzaSyCnSYhjg8gdmUW4KG6iFVqWYr23dQ3rcz4",
                method: "POST",
                data: {
                    "contents": [{
                        "parts": [{ "text": question }]
                    }],
                },
            })
            const result = response.data.candidates[0].content.parts[0].text;
            setAnswer(result);
        } catch (e) {
            console.error("Error:", e);
            setAnswer("Oops! Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="container-lg">
                <h1 className="text-white pb-2">Promptlyy</h1>
                <div className="row pb-5">
                    <div className="col-9">
                        <FloatingLabel controlId="floatingTextarea2" label="add your prompt here">
                            <Form.Control
                                value={question}
                                className="textFieldColor "
                                onChange={(e) => setQuestion(e.target.value)}
                                as="textarea"
                                placeholder="Your answer Will Appear here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </div>
                    <div className="col-auto mt-4">
                        {
                            isLoading ?(
                                <span className="loader"></span>
                            ) : (
                                <Button onClick={geenrateAnswer} variant="outline-light" as="input" type="button" value="generate" />

                            )
                        }
                    </div>
                </div>

                {
                    isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '350px' }}>
                            <span className="loader"></span>
                        </div>
                    ) : (
                        <FloatingLabel controlId="floatingTextarea2" label="your response will appear here">
                            <Form.Control
                                value={answer}
                                className="textFieldColor "
                                onChange={(e) => setQuestion(e.target.value)}
                                as="textarea"
                                placeholder="Your answer Will Appear here"
                                style={{ height: '400px' }}
                            />
                        </FloatingLabel>
                    )
                }
            </div>
        </>
    )
}

export default App
