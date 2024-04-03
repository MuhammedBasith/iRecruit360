# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
#
#
# def send_email(candidateName, candidateEmail, interviewName, secretCode, dateAndTime):
#     port = 587
#     smtp_server = "smtp.gmail.com"
#     userlogin = "teamirecruit360@gmail.com"
#     password = "acxk tggb jjzt wwjf"
#
#     sender_email = "teamirecruit360@gmail.com"
#     receiver_email = candidateEmail
#     message = MIMEMultipart("alternative")
#     message["Subject"] = "multipart test"
#     message["From"] = sender_email
#     message["To"] = receiver_email
#
#     candidate_name = candidateName
#     interview_name = interviewName
#     company_name = "Edforma"
#     secret_code = secretCode
#     date_and_time = dateAndTime
#
#     plain_text_template = """\
#     Hi,
#
#     Congratulations, {candidate_name}! You have been invited to participate in the interview for the position of {interview_name} at {company_name}.
#
#     Your secret code for the interview is: {secret_code}
#
#     The interview is scheduled for {date_and_time}.
#
#     We wish you the best of luck!
#
#     Sincerely,
#     Team Edforma
#     """
#
#     # Replace placeholders with dynamic values
#     plain_text_content = plain_text_template.format(
#         candidate_name=candidate_name,
#         interview_name=interview_name,
#         company_name=company_name,
#         secret_code=secret_code,
#         date_and_time=date_and_time
#     )
#
#     # Your HTML template with placeholders
#     html_template = """
#     <html>
#       <head>
#         <style>
#           .container {
#             text-align: center;
#             margin-top: 50px;
#           }
#           .heading {
#             font-size: 24px;
#             font-weight: bold;
#           }
#           .content {
#             margin-top: 20px;
#             font-size: 16px;
#           }
#           .code {
#             font-size: 32px;
#             font-weight: bold;
#             color: #ff0000; /* Red color for the code */
#           }
#         </style>
#       </head>
#       <body>
#         <div class="container">
#           <h1 class="heading">iRecruit360</h1>
#           <div class="content">
#             <p>Dear [Candidate Name],</p>
#             <p>Congratulations! You have been invited to participate in the interview for the position of [Interview Name] at [Company Name].</p>
#             <p>Your secret code for the interview is: <br /><span class="code">[Secret Code]</span></p>
#             <p>The interview is scheduled for [Date and Time].</p>
#             <p>We wish you the best of luck!</p>
#             <p>Team Edforma</p>
#           </div>
#         </div>
#       </body>
#     </html>
#     """
#
#     html_content = html_template.replace("[Candidate Name]", candidate_name)
#     html_content = html_content.replace("[Interview Name]", interview_name)
#     html_content = html_content.replace("[Company Name]", company_name)
#     html_content = html_content.replace("[Secret Code]", secret_code)
#     html_content = html_content.replace("[Date and Time]", date_and_time)
#
#     # Now `html_content` contains the HTML with actual dynamic values
#     print(html_content)
#
#     # convert both parts to MIMEText objects and add them to the MIMEMultipart message
#     part1 = MIMEText(plain_text_template, "plain")
#     part2 = MIMEText(html_content, "html")
#     message.attach(part1)
#     message.attach(part2)
#
#     # send your email
#     with smtplib.SMTP("smtp.gmail.com", 587) as server:
#         server.connect("smtp.gmail.com", 587)
#         server.ehlo()
#         server.starttls()
#         server.ehlo()
#         server.login(userlogin, password)
#         server.sendmail(
#             sender_email, receiver_email, message.as_string()
#         )
#
#     print('Sent')
#
#
# send_email('basith', 'iambasith123@gmail.com', 'AWS', '145752', 'Friday')
