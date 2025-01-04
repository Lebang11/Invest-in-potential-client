import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { api, endpoints } from './config/api';
import { aptitudeQuestions, eqQuestions } from './data/assessmentQuestions';
import { useAuth } from './context/AuthContext';
import { assessmentService } from './services/api';

const AssessmentTests = () => {
    const [currentTest, setCurrentTest] = useState('aptitude');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(currentTest === 'aptitude' ? 2400 : 900); // 40 min for aptitude, 15 for EQ
    const [shuffledQuestions, setShuffledQuestions] = useState({
        aptitude: [],
        eq: []
    });
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const maxTabSwitches = 3;
    const navigate = useNavigate();
    const { user } = useAuth();
    const [hasPaid, setHasPaid] = useState(false);

    // Shuffle questions on component mount
    useEffect(() => {
        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        setShuffledQuestions({
            aptitude: shuffleArray(aptitudeQuestions),
            eq: shuffleArray(eqQuestions)
        });
    }, []);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentTest]);

    // Tab visibility detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitchCount((prev) => {
                    const newCount = prev + 1;
                    if (newCount >= maxTabSwitches) {
                        handleSubmit();
                        alert("Test automatically submitted due to multiple tab switches.");
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    // Prevent copy-paste
    useEffect(() => {
        const preventCopyPaste = (e) => {
            e.preventDefault();
            alert("Copy-paste is not allowed during the test.");
        };

        document.addEventListener('copy', preventCopyPaste);
        document.addEventListener('paste', preventCopyPaste);
        document.addEventListener('cut', preventCopyPaste);

        return () => {
            document.removeEventListener('copy', preventCopyPaste);
            document.removeEventListener('paste', preventCopyPaste);
            document.removeEventListener('cut', preventCopyPaste);
        };
    }, []);

    // Prevent right-click
    useEffect(() => {
        const preventRightClick = (e) => {
            e.preventDefault();
        };

        document.addEventListener('contextmenu', preventRightClick);
        return () => document.removeEventListener('contextmenu', preventRightClick);
    }, []);

    // Format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const questions = currentTest === 'aptitude' ? aptitudeQuestions : eqQuestions;
    const totalQuestions = currentTest === 'aptitude' ? 30 : 15;
    const progress = ((currentTest === 'eq' ? 30 : 0) + currentQuestion + 1) / 45 * 100;

    useEffect(() => {
        const checkPaymentAndAssessment = async () => {
            try {
                if (!user) {
                    navigate('/login', { state: { from: '/assessment' } });
                    return;
                }

                const paymentStatus = await assessmentService.checkPaymentStatus(user.email);
                
                if (!paymentStatus.paid) {
                    navigate('/payment', { 
                        state: { 
                            message: 'Please complete payment to access the assessment'
                        }
                    });
                    return;
                }

                setHasPaid(true);
                setLoading(false);

            } catch (error) {
                console.error('Error checking payment status:', error);
                setError('Failed to verify payment status. Please try again.');
                setLoading(false);
            }
        };

        checkPaymentAndAssessment();
    }, [user, navigate]);

    const handleAnswer = (answerIndex) => {
        setAnswers({
            ...answers,
            [`${currentTest}_${currentQuestion}`]: answerIndex
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (currentTest === 'aptitude') {
            setCurrentTest('eq');
            setCurrentQuestion(0);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post(endpoints.assessment, {
                email: Cookies.get('token_email'),
                answers: answers,
                testType: 'both'
            });
            
            navigate('/course-signup');
        } catch (err) {
            setError('Failed to submit assessment. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container mt-5 pt-5">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 pt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                    <div className="mt-3">
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                        <button 
                            className="btn btn-outline-primary"
                            onClick={() => navigate('/')}
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!hasPaid) {
        return null; // Component will redirect in useEffect
    }

    return (
        <div style={{ 
            marginTop: "100px", 
            marginBottom: "50px",
            backgroundColor: "white",
            color: "black",
            padding: "50px 0",
            minHeight: "100vh"
        }} className="w-100">
            <div className="container">
                {/* Warning Banner */}
                <div className="alert alert-warning rounded-0 mb-4">
                    <strong>Warning:</strong> Switching tabs or windows more than {maxTabSwitches} times will automatically submit your test.
                    Time remaining: {formatTime(timeLeft)}
                </div>

                <h2 className="display-5 text-center text-dark mb-4">
                    {currentTest === 'aptitude' ? 'Aptitude Assessment' : 'Emotional Intelligence Assessment'}
                </h2>
                
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {/* Progress Bar */}
                        <div className="progress mb-4" style={{ height: "2px" }}>
                            <div 
                                className="progress-bar bg-dark" 
                                role="progressbar" 
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                            ></div>
                        </div>

                        <div className="border border-dark p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <span className="badge bg-dark">
                                    {currentTest === 'aptitude' ? 'Aptitude Test' : 'EQ Test'}
                                </span>
                                <span className="badge bg-dark">
                                    Question {currentQuestion + 1} of {totalQuestions}
                                </span>
                            </div>
                            
                            <p className="mb-4 h5">{questions[currentQuestion].question}</p>
                            
                            <div className="d-flex flex-column gap-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        className={`btn ${
                                            answers[`${currentTest}_${currentQuestion}`] === index 
                                            ? 'btn-dark' 
                                            : 'btn-outline-dark'
                                        } text-start rounded-0`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {error && <p className="text-danger mt-4">{error}</p>}
                            
                            <div className="mt-4 d-flex justify-content-between align-items-center">
                                <div className="small text-muted">
                                    {Math.round(progress)}% complete
                                </div>
                                <button
                                    onClick={handleNext}
                                    className="btn btn-dark rounded-0"
                                    disabled={answers[`${currentTest}_${currentQuestion}`] === undefined || isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                            Processing...
                                        </>
                                    ) : currentTest === 'eq' && currentQuestion === questions.length - 1 
                                        ? 'Submit' 
                                        : 'Next Question'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentTests; 