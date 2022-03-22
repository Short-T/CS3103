#!/bin/env python3
#
# Improved demonstration of pymysql to call a stored procedure
# Logan Davidson, March 19 2022
#
import pymysql.cursors
import settings
# Make the connection
dbConnection = pymysql.connect(settings.DBHOST,
					settings.DBUSER,
					settings.DBPASSWD,
					settings.DBDATABASE,
					charset='utf8mb4',
					cursorclass= pymysql.cursors.DictCursor)
sqlProcName = 'getPosts'

# Run query and get result
try:
	cursor = dbConnection.cursor()
	cursor.callproc(sqlProcName)
	dbConnection.commit()

	# We get all of the results and then iterate through them.
	results = cursor.fetchall()

	# Figure out what to do for images
	for row in results:
		print ("%s" % (row["PostCaption"]) )

except pymysql.MySQLError as e:
	# failure
	print(e)
finally:
	#close dbConnection
	dbConnection.close()

# End.