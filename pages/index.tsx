import { useEffect } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import QuizCard from "../components/QuizCard";

import { categories } from "../utils/data";
import { Quiz } from "../utils";
import { useQuizData } from "../contexts/QuizDataProvider";
import { resetQuizState } from "../reducers/quiz.reducer";

const Home = ({ quizzes }: { quizzes: Quiz[] }) => {
	const router = useRouter();
	const searchedCategory = router?.query?.cat || "All";

	const { dispatch } = useQuizData();

	useEffect(() => {
		dispatch(resetQuizState());
	}, [dispatch]);
	return (
		<Layout>
			<Seo />
			<main className="w-full grow flex flex-col">
				<div className="w-full bg-themeBg h-16 flex items-center z-10 sticky top-16 sm:top-20">
					<nav className="w-full flex justify-start sm:justify-center flex-nowrap overflow-x-auto whitespace-nowrap tracking-wide">
						{categories.map((cat, index) => (
							<div key={index}>
								<Link href={`?cat=${encodeURI(cat)}`}>
									<a
										className={`mx-1 px-6 py-1 my-[5px]  text-[16.25px]   text-gray-500 border border-gray-700 rounded-full  flex justify-center items-center whitespace-nowrap  font-medium transition-all ease duration-[250ms] hover:text-green-400 hover:border-green-400 ${
											searchedCategory === cat
												? "text-green-400 border-green-400 px-8"
												: ""
										}`}
									>
										{cat}
									</a>
								</Link>
							</div>
						))}
					</nav>
				</div>

				<div className="grow px-9 flex flex-col items-center">
					{searchedCategory === "All"
						? quizzes?.map((q) => <QuizCard quiz={q} key={q._id} />)
						: quizzes
								?.filter((quiz) => quiz.category === searchedCategory)
								.map((q) => <QuizCard quiz={q} key={q._id} />)}
				</div>
			</main>
		</Layout>
	);
};

export default Home;

export const getStaticProps = async () => {
	const response = await fetch("https://cine-insta.herokuapp.com/quizzes");
	if (response.status === 200) {
		const data = await response.json();
		return {
			props: {
				quizzes: data.response,
			},
			revalidate: 10,
		};
	}
};
