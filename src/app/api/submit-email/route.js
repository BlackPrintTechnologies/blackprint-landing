
import { google } from 'googleapis';

export async function POST(request) {
  try {
    const { email } = await request.json();

    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
      console.log('Credentials parsed successfully');
    } catch (parseError) {
      console.error('Error parsing credentials:', parseError);
      return new Response(JSON.stringify({ message: 'Error parsing credentials' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!credentials.private_key) {
      console.error('Private key is missing from credentials');
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, new Date().toISOString()]],
      },
    });

    return new Response(JSON.stringify({ message: 'Email submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}