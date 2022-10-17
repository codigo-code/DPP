import boto3

client = boto3.client('s3')

def main(event,context):
    response = client.list_buckets()
    list=[]
    for b  in response['Buckets']:
        list.append(b['Name'])
        print(f' {b["Name"]}')
        return list