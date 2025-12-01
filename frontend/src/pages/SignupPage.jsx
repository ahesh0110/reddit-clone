import { Link } from "react-router-dom";
import logo from "../assets/reddit-logo.png";

export default function SignupPage() {
    const handleSignup = (e) => {
        e.preventDefault();
        // TODO: replace with real signup API call
        console.log("handleSignup placeholder");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-reddit-page dark:bg-reddit-dark_bg">
            <div className="w-full max-w-md">
                <div className="bg-reddit-card dark:bg-reddit-dark_card rounded-lg p-6 border border-reddit-border dark:border-reddit-dark_divider shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <img src={logo} alt="logo" className="h-8 w-8" />
                        <div>
                            <h1 className="text-lg font-semibold text-reddit-text dark:text-reddit-dark_text">Create an account</h1>
                            <p className="text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">Join now — it only takes a minute.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-reddit-text_secondary dark:text-reddit-dark_text_secondary mb-1">Email</label>
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full px-3 py-2 rounded-md bg-white dark:bg-reddit-dark_input border border-reddit-border dark:border-reddit-dark_divider text-reddit-text dark:text-reddit-dark_text placeholder-gray-400 dark:placeholder-reddit-dark_text_secondary focus:outline-none focus:ring-2 focus:ring-reddit-blue/30"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-reddit-text_secondary dark:text-reddit-dark_text_secondary mb-1">Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Choose a password"
                                className="w-full px-3 py-2 rounded-md bg-white dark:bg-reddit-dark_input border border-reddit-border dark:border-reddit-dark_divider text-reddit-text dark:text-reddit-dark_text placeholder-gray-400 dark:placeholder-reddit-dark_text_secondary focus:outline-none focus:ring-2 focus:ring-reddit-blue/30"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-reddit-blue hover:bg-reddit-blue_hover text-reddit-card font-semibold py-2 rounded-md"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-sm text-reddit-text_secondary dark:text-reddit-dark_text_secondary">
                        Already have an account?{' '}
                        <Link to="/login" className="text-reddit-blue dark:text-reddit-dark_blue font-semibold">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
