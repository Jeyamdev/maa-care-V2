import { useEffect, useRef, useState, type FormEvent } from 'react';
import { questions, isValidAnswer, isValidAnswers } from '@maa-care/epds-core';
import { useAssessment } from '../context/AssessmentContext';
export default function Assessment({ finish }: { finish: () => void }) {
  const { state, dispatch } = useAssessment();
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorMessage = useRef<HTMLParagraphElement>(null);
  const submitting = useRef(false);
  const question = questions[index];
  useEffect(() => { heading.current?.focus(); window.scrollTo(0, 0); setError(false); }, [index]);
  useEffect(() => { if (error) errorMessage.current?.focus(); }, [error]);
  function next(event: FormEvent) {
    event.preventDefault();
    if (!isValidAnswer(state.answers[index])) { setError(true); errorMessage.current?.focus(); return; }
    if (index < questions.length - 1) setIndex(index + 1);
    else if (!submitting.current && isValidAnswers(state.answers)) {
      submitting.current = true;
      dispatch({ type: 'complete' });
      finish();
    }
  }
  return <div className="assessment-layout"><aside className="assessment-aside"><span className="eyebrow">EPDS Calculator</span><h2>உங்கள் உணர்வுகள் முக்கியம்.</h2><p>கடந்த 7 நாட்களில் நீங்கள் உணர்ந்ததை நினைத்துப் பதிலளிக்கவும்.</p><p className="muted">நிதானமாகப் பதிலளிக்கலாம். முடிப்பதற்கு முன் உங்கள் பதில்களை மாற்றலாம்.</p></aside><div className="question-area"><div className="progress-label"><h1 ref={heading} tabIndex={-1}>கேள்வி {index + 1} / {questions.length}</h1><span aria-hidden="true">{(index + 1) * 10}%</span></div><progress value={index + 1} max={questions.length} aria-label={`கேள்வி ${index + 1}, மொத்தம் ${questions.length}`} /><form noValidate onSubmit={next}><fieldset aria-describedby={error ? 'answer-error' : undefined}><legend>{question.question}</legend><div className="options">{question.options.map((option, answer) => <label className={`option ${state.answers[index] === answer ? 'selected' : ''}`} key={`${index}-${answer}`}><input type="radio" name="answer" value={answer} checked={state.answers[index] === answer} onChange={() => { dispatch({ type: 'answer', index, answer }); setError(false); }} required /><span>{option}</span><span className="selection" aria-hidden="true">{state.answers[index] === answer ? '✓' : ''}</span></label>)}</div></fieldset>{error && <p id="answer-error" className="error" role="alert" tabIndex={-1} ref={errorMessage}>தொடர்வதற்கு முன் ஒரு பதிலைத் தேர்ந்தெடுக்கவும்.</p>}<div className="actions question-actions"><button className="button secondary" type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>முந்தையது</button><button className="button" type="submit">{index === questions.length - 1 ? 'முடி' : 'அடுத்து'} <span aria-hidden="true">→</span></button></div></form><p className="muted small">பதில்கள் இந்த இணையதளத்தால் சேமிக்கப்படுவதில்லை.</p></div></div>;
}
