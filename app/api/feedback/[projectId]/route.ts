import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { feedbacks } from '@/db/schema';
export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const projectIdInt = parseInt(projectId, 10);

  if (isNaN(projectIdInt)) {
    return NextResponse.json({ error: 'Invalid projectId' }, { status: 400 });
  }

  try {
    const feedbackList = await db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.projectId, projectIdInt));

    return NextResponse.json({ feedbacks: feedbackList }, { status: 200 });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}
