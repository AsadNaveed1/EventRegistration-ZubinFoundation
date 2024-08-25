from google.cloud import dialogflowcx_v3
import os
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton
from telegram.ext import Application , CommandHandler, MessageHandler, filters, ContextTypes, CallbackQueryHandler, CallbackContext
from google.api_core.exceptions import GoogleAPICallError
import requests
import pandas as pd


BOT_TOKEN ="7478762138:AAG-6AmWxqIiH1q7rwdDfW001IC2Q4LNLp8" #TeleBot Token
BOT_USER_NAME = "@Volunteer_helperbot"
PROJECT_ID = 'ai-tester-433403'
REGION_ID = "global" #Could be US
SUBDOMAIN_REGION_ID  = REGION_ID #Same as region if it is global
APP_ID = "" #Agent APP ID
GOOGLE_APPLICATION_CREDENTIALS = "/Users/tools/Desktop/AI/ai-tester-433403-8961101ab864.json" #The path to access the private key json file
LANGUAGE_CODE = "en"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_APPLICATION_CREDENTIALS # Set the environment variable for authentication


client = dialogflowcx_v3.SessionsClient()


def Get_respone_from_AI(end_user_input, session_id):
    # Create a client
    # Initialize request argument(s)
    
    query_input = dialogflowcx_v3.QueryInput()
    query_input.text.text = end_user_input
    query_input.language_code = LANGUAGE_CODE                         
    
    # Request body
    request = dialogflowcx_v3.DetectIntentRequest(
        session= "projects/{}/locations/{}/agents/{}/sessions/123".format(PROJECT_ID, REGION_ID, APP_ID,session_id), #use the chat_id from telegram to identify the users, allows their ai indenpendent to each other
        query_input=query_input
    )
    
    try:
    # Handle the response
        response = client.detect_intent(request=request)
        return response.query_result.response_messages[0].text.text[0]
    
    #Handle error during getting response from Gemini
    except GoogleAPICallError as e:
        print(f"Error occurred while calling Dialogflow CX API: {e}")
        #Reply an error message to user
        return "I'm sorry, there was an error processing your request. Please try again later."


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text : str = update.message.text
    user_id = str(update.message.from_user.id)
    await update.message.reply_text(Get_respone_from_AI(text, user_id)) # response via AI

async def set_language(update: Update, context: CallbackContext):
    query = update.callback_query
    await query.answer()
    global LANGUAGE_CODE 
    
    # Check which button was clicked
    if query.data == 'zh':
        LANGUAGE_CODE = 'zh'
        key = [[KeyboardButton("I want to register an event")],[KeyboardButton("I want to get the training material")],[KeyboardButton("Give me the detail about the registered event")]]
        reply_keyboard = ReplyKeyboardMarkup(keyboard=key, resize_keyboard=True,is_persistent=True)
        await query.edit_message_text(text="#TODO: traditional chinese intro") #Intro to the user
        await context.bot.send_message(chat_id=update.effective_chat.id, text="intro1 continue", reply_markup=reply_keyboard)
    
    
    elif query.data == 'en':
        LANGUAGE_CODE = 'en'
        key = [[KeyboardButton("I want to register an event")],[KeyboardButton("I want to get the training material")],[KeyboardButton("Give me the detail about the registered event")]]
        reply_keyboard = ReplyKeyboardMarkup(keyboard=key, resize_keyboard=True,is_persistent=True)
        await query.edit_message_text(text="#TODO: english intro")
        await context.bot.send_message(chat_id=update.effective_chat.id, text="intro3 continue", reply_markup=reply_keyboard)

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("中文", callback_data='zh'),
                 InlineKeyboardButton("English", callback_data='en')]]
    reply_keyboard = InlineKeyboardMarkup(keyboard)
    # Send the message with the reply keyboard
    await update.message.reply_text("Please choose your language.\n請選擇您的語言。", reply_markup=reply_keyboard)


def telemain():
    app = Application.builder().token(BOT_TOKEN).build()
    print('Starting...')
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(MessageHandler(filters.TEXT,handle_message))
    app.add_handler(CallbackQueryHandler(set_language))
    print('Polling...')
    app.run_polling(timeout=1000)



if __name__ == '__main__':
    telemain()

