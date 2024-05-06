from hume import HumeBatchClient
from hume.models.config import FaceConfig

client = HumeBatchClient("GYArS75UPtrsNr2b7DFh1G7AJrvxNnlA0j5JVuR9ETX5neON")
filepaths = [
    "faces.zip",
]
config = FaceConfig()
job = client.submit_job(None, [config], files=filepaths)

print(job)
print("Running...")

details = job.await_complete()
job.download_predictions("predictions.json")
print("Predictions downloaded to predictions.json")
