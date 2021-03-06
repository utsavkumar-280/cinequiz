/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";

import { Quiz } from "../../utils";
const QuizCard = ({ quiz }: { quiz: Quiz }) => {
	return (
		<Link href={`/quiz?quizid=${encodeURI(quiz._id)}`}>
			<a className="w-full mb-4 group bg-themeCard rounded-xl sm:flex sm:w-11/12 sm:h-64  xl:w-5/6  hover:shadow-md hover:shadow-green-400/10 transition-all ease duration-[250ms]">
				<div className="relative w-full h-96 sm:w-4/12 sm:h-full  lg:w-4/12 2xl:w-3/12">
					<Image
						src={quiz.coverImage}
						alt="quiz-img"
						layout="fill"
						objectFit="cover"
						priority
						className="rounded-t-xl sm:rounded-l-xl sm:rounded-r-none"
					/>
				</div>

				<div className="h-[90px] p-2 px-3 flex flex-col justify-between sm:justify-around sm:h-full sm:w-8/12 lg:w-10/12 2xl:w-11/12">
					<h2 className=" text-gray-200 text-base font-semibold sm:text-lg group-hover:text-green-400 transition-all ease duration-[250ms] 2xl:text-xl">
						{quiz.name}
					</h2>
					<p className="hidden sm:block sm:text-sm text-gray-500 xl:mb-14">
						{quiz.description}
					</p>
					<div className="flex justify-between text-sm">
						<p className=" text-gray-400 sm:text-green-400  tracking-wide">
							{`${quiz.questions.length} questions`}
						</p>
						<p className=" text-green-400">
							+{quiz.questions[0].points}
							<span className=" text-red-500 ml-1">
								-{quiz.questions[0].negativePoints}
							</span>
						</p>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default QuizCard;
