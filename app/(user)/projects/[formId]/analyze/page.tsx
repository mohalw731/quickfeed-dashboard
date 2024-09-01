import ClientComponent from "./clinetAnalyze";
import ServerComponent from "./serverAnalyze";


export default async function Page({ params }: { params: { formId: string } }) {
  const { feedbackMessages } = await ServerComponent({ formId: params.formId });

  return <ClientComponent feedbackMessages={feedbackMessages as string[]} />;
}
